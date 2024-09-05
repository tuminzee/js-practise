const fs = require("fs");

// Read the JSON file
fs.readFile("new_iata.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  // Parse the JSON data
  const originalData = JSON.parse(data);

  let filteredData = [];
  for (let i = 0; i < originalData.length; i++) {
    console.log(originalData[i].country_code);
    filteredData.push({
      value: originalData[i].iata,
      label: `${originalData[i].iata} - ${originalData[i].airport} - ${originalData[i].city}`,
    });
  }

  // // Filter the required fields
  // const filteredData = originalData.reduce((item) => {

  //   if (item.country_code != "US"){
  //     return null
  //   }

  //   let label = item.iata;
  //   if (item.airport) {
  //     label += ` - ${item.airport}`;
  //   }
  //   if (item.city) {
  //     label += ` - ${item.city}`;
  //   }

  //   return {
  //     iata: item.iata,
  //     airport: item.airport,
  //     city: item.city,
  //     state: item.state,
  //     label: label,
  //   };
  // });

  // Output the filtered JSON
  console.log(filteredData);

  // Optionally, you can write the filtered data back to a new file
  fs.writeFile(
    "new_data.json",
    JSON.stringify(filteredData, null, 2),
    (err) => {
      if (err) {
        console.error("Error writing the file:", err);
      } else {
        console.log("Filtered data saved to filtered_data.json");
      }
    }
  );
});
