import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import React from "react";
import dayjs from "dayjs";

const Statement = ({ data }) => {
  console.log({ data });
  return (
    <Document pageMode="full-screen">
      <Page size="A4" orientation="landscape">
        <View fixed={true} style={{ flex: 1, paddingHorizontal: 65 }}>
          <Text style={styles.title}>CLIENT ACCOUNT STATEMENT</Text>
          <Text style={styles.header}>Full name: Athanas Shauritanga</Text>
          <Text style={styles.header}>CDS Number: 647482</Text>
          <Text style={styles.header}>Telephone Number(s): +255629593331</Text>
          <Text style={styles.header}>Identiication: NIDA</Text>
          <Text style={styles.header}>ID Number: 19880222-43105-00001-28</Text>
          <Text style={styles.header}>Nationality: Tanzania</Text>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>date</Text>
              <Text style={styles.tableHeaderCell}>type</Text>
              {/* <Text style={styles.tableHeaderCell}>category</Text> */}
              <Text style={[styles.tableHeaderCell, { flex: 2 }]}>
                reference
              </Text>
              <Text style={[styles.tableHeaderCell, { flex: 2 }]}>
                particulars
              </Text>
              <Text style={styles.tableHeaderCell}>quantity</Text>
              <Text style={styles.tableHeaderCell}>price</Text>
              <Text style={styles.tableHeaderCell}>debit</Text>
              <Text style={styles.tableHeaderCell}>credit</Text>
              <Text style={styles.tableHeaderCell}>balance</Text>
            </View>
            {data.map((item, index) => (
              <View style={styles.tableData} key={index}>
                <Text style={styles.tableDataCell}>
                  {dayjs(item.date).format("DD-MM-YYYY")}
                </Text>
                <Text style={styles.tableDataCell}>{item.type}</Text>
                {/* <Text style={styles.tableDataCell}>{item.category}</Text> */}
                <Text style={[styles.tableDataCell, { flex: 2 }]}>
                  {item.reference}
                </Text>
                <Text style={[styles.tableDataCell, { flex: 2 }]}>
                  {item.particulars}
                </Text>
                <Text style={styles.tableDataCell}>{item.quantity}</Text>
                <Text style={styles.tableDataCell}>{item.price}</Text>
                <Text style={styles.tableDataCell}>{item.debit}</Text>
                <Text style={styles.tableDataCell}>{item.credit}</Text>
                <Text style={styles.tableDataCell}>{item.balance}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
    textAlign: "center",
    marginVertical: 40,
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "hsl(243deg, 50%, 21%)",
    color: "#fff",
    border: "none",
  },
  tableData: {
    flexDirection: "row",
    borderLeft: "1px solid hsl(243deg, 50%, 21%)",
    borderRight: "1px solid hsl(243deg, 50%, 21%)",
    borderBottom: "1px solid hsl(243deg, 50%, 21%)",
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 8.5,
    textTransform: "uppercase",
    padding: 3,
  },
  tableDataCell: {
    flex: 1,
    fontSize: 8.5,
    paddingHorizontal: 4,
    paddingVertical: 4,
    textAlign: "left",
  },
  header: {
    fontSize: 10,
  },
});

export default Statement;
