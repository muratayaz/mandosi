import { Flex, Image, Stack, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { collarModel } from "../../constants/collorModel";
import { customerDetailTypes } from "../../constants/customer";

function OrderDetailPrint({ order, customers }) {
  console.log(order);

  const InfoText = ({ title, text }: { title: string; text: string }) => (
    <Flex gap={2.5} alignItems="center">
      <Text>{title}</Text>
      <Text>{text}</Text>
    </Flex>
  );
  return (
    <div>
      <Stack spacing={5}>
        <Image
          src={order.image && order.image.url}
          w="full"
          maxW={260}
          h={260}
          maxH={260}
          objectFit="cover"
          objectPosition="center"
          borderRadius="12px"
          fallbackSrc="https://via.placeholder.com/300"
        />
        <InfoText title="Müşteri:" text={order.Customer.name} />
        <div>
          <div
            style={{
              width: "33%",
              display: "inline-block",
            }}
          >
            <Text>1. Prova Tarihi</Text>
            <Text>
              {order.trialDate
                ? moment(order.trialDate).format("YYYY-MM-DD")
                : "Yok"}
            </Text>
          </div>
          <div
            style={{
              width: "33%",
              display: "inline-block",
            }}
          >
            <Text>2. Prova Tarihi</Text>
            <Text>
              {order.trialDate2
                ? moment(order.trialDate2).format("YYYY-MM-DD")
                : "Yok"}
            </Text>
          </div>
          <div
            style={{
              width: "33%",
              display: "inline-block",
            }}
          >
            <Text>Teslim Tarihi</Text>
            <Text>
              {order.deliveryDate
                ? moment(order.deliveryDate).format("YYYY-MM-DD")
                : "Yok"}
            </Text>
          </div>
        </div>
        {/* <div>
          <div
            style={{
              width: "33%",
              display: "inline-block",
            }}
          >
            <Text>Ödeme Türü</Text>
            <Text>{order.paymentType}</Text>
          </div>
          <div
            style={{
              width: "33%",
              display: "inline-block",
            }}
          >
            <Text>Avans</Text>
            <Text>{order.paid} TL</Text>
          </div>
          <div
            style={{
              width: "33%",
              display: "inline-block",
            }}
          >
            <Text>Toplam Ücret</Text>
            <Text>{order.price} TL</Text>
          </div>
        </div> */}
        <div>
          <Text>Açıklama</Text>
          <Text noOfLines={1}>{order.description}</Text>
        </div>

        <Stack spacing={5}>
          <Text>Ölçü Bilgileri</Text>
          <hr />

          <div>
            {Object.keys(customerDetailTypes).map((key, idx) => {
              const { title, type, category } = customerDetailTypes[key];
              const text = order.Detail[key];

              if (category.some((x) => x === order.type)) {
                if (type === "image") {
                  return (
                    <div
                      style={{
                        width: "33%",
                        display: "inline-block",
                      }}
                    >
                      <Text>{title}</Text>
                      <Image
                        src={
                          collarModel.find(
                            (x) => x.id === order?.Detail.collarModel
                          )?.image ?? null
                        }
                        objectFit="contain"
                        objectPosition="center"
                        fallbackSrc="https://via.placeholder.com/300"
                      />
                    </div>
                  );
                }

                return (
                  <div
                    style={{
                      width: "33%",
                      display: "inline-block",
                    }}
                  >
                    <InfoText
                      key={idx}
                      title={`${title}:`}
                      text={`${text ?? ""} ${
                        type === "number" && text ? "cm" : ""
                      }`}
                    />
                  </div>
                );
              }

              return null;
            })}
          </div>
        </Stack>
      </Stack>
    </div>
  );
}

export default OrderDetailPrint;
