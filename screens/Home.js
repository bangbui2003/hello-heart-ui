import { View, Text, SafeAreaView, Alert, Switch } from "react-native";
import React, { useState } from "react";
import LineChart from "../components/LineChart";

const Home = () => {

  return (
    <SafeAreaView>
      <LineChart
        line_chart_data={[
          { month: "Jan", value: 300 },
          { month: "Feb", value: 400 },
          { month: "Mar", value: 300 },
          { month: "Apr", value: 620 },
          { month: "May", value: 545 },
          { month: "June", value: 545 },
          { month: "July", value: 300 },
          { month: "Aug", value: 400 },
          { month: "Sep", value: 155 },
          { month: "Oct", value: 620 },
          { month: "Nov", value: 545 },
          { month: "Dec", value: 545 },
        ]}
        containerHeight={350}
        circleColor="#daa520"
        axisColor="#9dd"
        tooltipVisible={true}
        onPressItem={(item) => Alert.alert(`${item.month}: ${item.value}`)}
      />
    </SafeAreaView>
  );
};

export default Home;
