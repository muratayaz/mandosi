import {
  Button,
  FormControl,
  FormLabel,
  GridItem,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  SimpleGrid,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";

import moment from "moment";
import { OrderType, PaymentType } from "@prisma/client";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { customerDetailTypes } from "../../constants/customer";
import request from "../../service/request";
import { useEffect, useState } from "react";
import { MdRestoreFromTrash } from "react-icons/md";
import { maxAllowedSize } from "../../constants/image";
import CollarModelsModal from "./CollarModelsModal";

export default function OrderForm(props: any) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { handleFormSubmit, order = {}, customers = [] } = props || {};
  const toast = useToast();
  const [image, setImage] = useState(order.image);
  const scheme = yup
    .object()
    .shape({
      customerId: yup.number().required("Müşteriyi seçiniz"),
      type: yup.string().required("Sipariş kategorisini seçiniz"),
      deliveryDate: yup.date().min(today, "Geçerli bir tarih giriniz"),
      trialDate: yup.date().min(today, "Geçerli bir tarih giriniz"),
      description: yup.string(),
      paymentType: yup.string().required("Ödeme tipini seçiniz"),
      price: yup.number().required("Sipariş fiyatını giriniz"),
      paid: yup
        .number()
        .required("Ödenen miktarı giriniz")
        .test(
          "paid test",
          "Ödenen miktar, sipariş fiyatından fazla olamaz",
          function (value) {
            return value <= this.parent.price;
          }
        ),
    })
    .defined();

  const {
    handleSubmit,
    register,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(scheme),
  });

  useEffect(() => {
    const id = Number(watch("customerId"));
    const category = watch("type");
    if (id > 0 && category) {
      const customer = customers.find((c) => c.id === id);
      console.log(customer);

      if (customer) {
        Object.keys(customerDetailTypes).forEach((key) => {
          if (
            customerDetailTypes[key].category.some((x) => x === watch("type"))
          )
            setValue(`detail.${key}`, customer.Detail[key]);
          else {
            setValue(`detail.${key}`, null);
          }
        });
      }
    }
  }, [watch("customerId"), watch("type")]);

  async function onSubmit(values) {
    if (image && !image.url) {
      const formData = new FormData();
      formData.append("image", image);

      const response = await request.post("/upload", formData).catch((err) => {
        console.log(err);
        toast({
          title: "Resim yüklenirken bir hata oluştu",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });
        return err;
      });
      values.imageId = response.data;
    }
    if (values.trialDate2) {
      values.trialDate2 = new Date(values.trialDate2);
    } else values.trialDate2 = null;

    const result = await handleFormSubmit(values);
    if (result) {
      reset();
      setImage(null);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={5}>
          <InputGroup w="full" maxW={300} maxH={260}>
            <Input
              type="file"
              height="100%"
              width="100%"
              position="absolute"
              top="0"
              left="0"
              opacity="0"
              bg="twitter.400"
              aria-hidden="true"
              accept="image/*"
              multiple={false}
              cursor="pointer"
              onChange={(e) => {
                if (e.target.files[0].size > maxAllowedSize) {
                  setImage(null);
                  e.target.value = "";
                  toast({
                    title: "Dosya boyutu 3MB'dan büyük olamaz",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-right",
                  });
                } else {
                  setImage(e.target.files[0]);
                }
              }}
            />
            <Image
              src={image && (image.url ?? URL.createObjectURL(image))}
              w="full"
              h={260}
              maxH={260}
              objectFit="cover"
              objectPosition="center"
              borderRadius="12px"
              fallbackSrc="https://via.placeholder.com/300"
            />
            {image && (
              <Icon
                as={MdRestoreFromTrash}
                position="absolute"
                top="5px"
                right="5px"
                color="red.500"
                cursor="pointer"
                fontSize={36}
                onClick={() => setImage(null)}
              />
            )}
          </InputGroup>
          <SimpleGrid
            columns={{
              sm: 2,
            }}
            gap={5}
          >
            <FormControl id="type" isInvalid={Boolean(errors.type)}>
              <FormLabel noOfLines={1}>Kategori</FormLabel>
              <Select
                id="type"
                placeholder="Kategori Seçiniz"
                defaultValue={order.type}
                {...register("type")}
              >
                {Object.values(OrderType).map((type, idx) => (
                  <option key={idx} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl id="customerId" isInvalid={Boolean(errors.customerId)}>
              <FormLabel noOfLines={1}>Müşteri</FormLabel>
              <Select
                id="customerId"
                placeholder="Müşteriyi Seçiniz"
                defaultValue={order.customerId}
                {...register("customerId")}
              >
                {customers.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <GridItem
              colSpan={{
                sm: 2,
              }}
            >
              <SimpleGrid
                columns={{
                  sm: 3,
                }}
                gap={5}
              >
                <FormControl
                  id="trialDate"
                  isInvalid={Boolean(errors.trialDate)}
                >
                  <FormLabel noOfLines={1}>1. Prova Tarihi</FormLabel>
                  <Input
                    id="trialDate"
                    type="date"
                    defaultValue={moment(order.trialDate).format("YYYY-MM-DD")}
                    {...register("trialDate")}
                  />
                </FormControl>

                <FormControl
                  id="trialDate2"
                  isInvalid={Boolean(errors.trialDate2)}
                >
                  <FormLabel noOfLines={1}>2. Prova Tarihi</FormLabel>
                  <Input
                    id="trialDate2"
                    type="date"
                    defaultValue={
                      order.trialDate2
                        ? moment(order.trialDate2).format("YYYY-MM-DD")
                        : null
                    }
                    {...register("trialDate2")}
                  />
                </FormControl>

                <FormControl
                  id="deliveryDate"
                  isInvalid={Boolean(errors.deliveryDate)}
                >
                  <FormLabel noOfLines={1}>Teslim Tarihi</FormLabel>
                  <Input
                    id="deliveryDate"
                    type="date"
                    defaultValue={moment(order.deliveryDate).format(
                      "YYYY-MM-DD"
                    )}
                    {...register("deliveryDate")}
                  />
                </FormControl>
              </SimpleGrid>
            </GridItem>

            <GridItem
              colSpan={{
                sm: 2,
              }}
            >
              <SimpleGrid
                columns={{
                  sm: 3,
                }}
                gap={5}
              >
                <FormControl
                  id="paymentType"
                  isInvalid={Boolean(errors.paymentType)}
                >
                  <FormLabel noOfLines={1}>Ödeme Türü</FormLabel>
                  <Select
                    id="paymentType"
                    placeholder="Ödeme türü Seçiniz"
                    defaultValue={order.paymentType}
                    {...register("paymentType")}
                  >
                    {Object.values(PaymentType).map((type, idx) => (
                      <option key={idx} value={type}>
                        {type}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl id="paid" isInvalid={Boolean(errors.paid)}>
                  <FormLabel noOfLines={1}>Avans</FormLabel>
                  <InputGroup>
                    <Input
                      id="paid"
                      defaultValue={order.paid}
                      min={0}
                      {...register("paid")}
                    />
                    <InputRightElement children=" TL" />
                  </InputGroup>
                </FormControl>

                <FormControl id="price" isInvalid={Boolean(errors.price)}>
                  <FormLabel noOfLines={1}>Toplam Ücret</FormLabel>
                  <InputGroup>
                    <Input
                      id="price"
                      defaultValue={order.price}
                      min={0}
                      {...register("price")}
                    />
                    <InputRightElement children=" TL" />
                  </InputGroup>
                </FormControl>
              </SimpleGrid>
            </GridItem>

            <GridItem colSpan={{ sm: 2 }}>
              <FormControl
                aria-colspan={2}
                id="description"
                isInvalid={Boolean(errors.description)}
              >
                <FormLabel>Açıklama</FormLabel>
                <Textarea
                  resize="none"
                  height="140px"
                  defaultValue={order.description}
                  {...register("description")}
                />
              </FormControl>
            </GridItem>
          </SimpleGrid>

          <Stack>
            <SimpleGrid columns={[1, 2, 3, 4]} gap={5}>
              {Object.keys(customerDetailTypes).map((key) => (
                <FormControl
                  key={key}
                  id={`detail.${key}`}
                  isInvalid={errors.detail && Boolean(errors.detail[key])}
                  hidden={
                    !customerDetailTypes[key].category.some(
                      (x) => x === (watch("type") || order.type)
                    )
                  }
                >
                  <FormLabel noOfLines={1}>
                    {customerDetailTypes[key]?.title ?? key}
                  </FormLabel>
                  {customerDetailTypes[key].type === "image" ? (
                    <CollarModelsModal setValue={setValue} />
                  ) : (
                    <InputGroup>
                      <Input
                        id={`detail.${key}`}
                        defaultValue={order.Detail && order.Detail[key]}
                        {...register(`detail.${key}`)}
                      />
                      <InputRightElement
                        children={
                          customerDetailTypes[key].type === "number" ? "cm" : ""
                        }
                        color="gray.500"
                      />
                    </InputGroup>
                  )}
                </FormControl>
              ))}
            </SimpleGrid>
          </Stack>

          <Button
            isLoading={isSubmitting}
            loadingText="Loading..."
            bg={"blue.400"}
            color={"white"}
            type="submit"
          >
            Kaydet
          </Button>
        </Stack>
      </form>
    </>
  );
}
