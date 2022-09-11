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
  SimpleGrid,
  Stack,
  Textarea,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import request from "../../service/request";

import moment from "moment";
import { customerDetailTypes } from "../../constants/customer";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { maxAllowedSize } from "../../constants/image";
import { MdRestoreFromTrash } from "react-icons/md";

export default function CustomerForm(props: any) {
  const { handleFormSubmit, customer = {} } = props || {};
  const [image, setImage] = useState(customer.image);
  const toast = useToast();

  const scheme = yup
    .object()
    .shape({
      name: yup.string().required("Adınızı giriniz"),
      email: yup
        .string()
        .email("Geçerli bir e-posta adresi giriniz")
        .required("E-posta adresi giriniz"),
      phone: yup.string().required("Telefon numarasını giriniz"),
      address: yup.string().required("Adresi giriniz"),
      birthday: yup.date().required("Doğum tarihinizi giriniz"),
    })
    .defined();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(scheme),
  });

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

    const result = await handleFormSubmit(values);
    if (result) reset();
  }

  return (
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
          <FormControl id="name" isInvalid={Boolean(errors.name)}>
            <FormLabel noOfLines={1}>İsim Soyisim</FormLabel>
            <Input
              id="name"
              defaultValue={customer.name}
              {...register("name")}
            />
          </FormControl>
          <FormControl id="email" isInvalid={Boolean(errors.email)}>
            <FormLabel>Email</FormLabel>
            <Input
              id="email"
              type="email"
              defaultValue={customer.email}
              {...register("email")}
            />
          </FormControl>

          <FormControl id="phone" isInvalid={Boolean(errors.phone)}>
            <FormLabel noOfLines={1}>Telefon</FormLabel>
            <Input
              id="phone"
              type="tel"
              defaultValue={customer.phone}
              {...register("phone")}
            />
          </FormControl>
          <FormControl id="birthday" isInvalid={Boolean(errors.birthday)}>
            <FormLabel noOfLines={1}>Doğum Tarihi</FormLabel>
            <Input
              id="birthday"
              type="date"
              defaultValue={moment(customer.birthday).format("YYYY-MM-DD")}
              {...register("birthday")}
            />
          </FormControl>
          <GridItem
            colSpan={{
              sm: 2,
            }}
          >
            <FormControl
              aria-colspan={2}
              id="address"
              isInvalid={Boolean(errors.address)}
            >
              <FormLabel>Adres</FormLabel>
              <Textarea
                resize="none"
                height={"3xs"}
                defaultValue={customer.address}
                {...register("address")}
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
              >
                <FormLabel noOfLines={1}>
                  {customerDetailTypes[key]?.title ?? key}
                </FormLabel>
                <InputGroup>
                  <Input
                    id={`detail.${key}`}
                    defaultValue={customer?.Detail && customer.Detail[key]}
                    {...register(`detail.${key}`)}
                  />
                  <InputRightElement
                    children="cm"
                    color={useColorModeValue("gray.800", "gray.500")}
                  />
                </InputGroup>
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
  );
}
