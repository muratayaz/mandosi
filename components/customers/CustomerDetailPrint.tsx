import { Flex, Stack, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { customerDetailTypes } from "../../constants/customer";

function CustomerDetailPrint({ customer, totalPrice }) {
  const InfoText = ({ title, text }: { title: string; text: string }) => (
    <Flex gap={2.5} alignItems="center">
      <Text>{title}</Text>
      <Text>{text}</Text>
    </Flex>
  );
  return (
    <div>
      <Stack spacing={5}>
        <Text>Müşteri Bilgileri</Text>
        <hr />

        <div>
          <InfoText title="İsim:" text={customer.name} />
          <InfoText title="Tel:" text={customer.phone} />
          <InfoText title="Adres:" text={customer.address} />
          <InfoText title="Mail:" text={customer.email} />
          <InfoText
            title="Doğum Tarihi:"
            text={moment(customer.birthday).format("DD/MM/YYYY")}
          />
        </div>

        <Stack spacing={5}>
          <Text>Ölçü Bilgileri</Text>
          <hr />

          <div>
            {Object.keys(customerDetailTypes).map((key, idx) => {
              const { title, type } = customerDetailTypes[key];
              const text = customer.Detail[key];

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
                    text={`${text} ${type === "number" && text ? "cm" : ""}`}
                  />
                </div>
              );
            })}
          </div>
        </Stack>

        <Stack spacing={5}>
          <Text>Sipariş Bilgileri</Text>
          <hr />
          <div>
            <div
              style={{
                width: "33%",
                display: "inline-block",
              }}
            >
              <InfoText
                title="Sipariş Sayısı:"
                text={`${customer.Orders.length} Adet`}
              />
            </div>
            <div
              style={{
                width: "33%",
                display: "inline-block",
              }}
            >
              <InfoText title="Toplam Borç:" text={`${totalPrice.debt} TL`} />
            </div>
            <div
              style={{
                width: "33%",
                display: "inline-block",
              }}
            >
              <InfoText title="Toplam Tutar:" text={`${totalPrice.total} TL`} />
            </div>
          </div>
        </Stack>
      </Stack>
    </div>
  );
}

export default CustomerDetailPrint;
