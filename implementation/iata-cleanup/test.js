const transformData = (input) => {
  return input.data.flatMap(item => 
    Object.entries(item).map(([key, flightData]) => ({
      ...flightData,
      FlightKey: key
    }))
  );
};

// Example usage
const input = {
  "data": [
    {
      "2024-08-15-AC1234-AC5678": {
        "TravelClass": "Business",
        "Origin": "JFK",
        "OriginCityName": "New York",
        "Destination": "LHR",
        "DestinationCityName": "London",
        "isDirect": false,
        "DepartureTime": "2024-08-15 10:00",
        "ArrivalTime": "2024-08-16 06:00",
        "flightNumbers": ["AC1234", "AC5678"],
        "BaggageAmount": "32",
        "BaggageType": "Kilograms",
        "Cost": "$1200.00",
        "CostFloat": 1200.00,
        "PurchasingId": "AC_20240815_JFK_LHR_BUSINESS_AC1234-AC5678",
        "connections": ["YYZ"],
        "Legs": [
          {
            "Segments": [
              {
                "Origin": "JFK",
                "Destination": "YYZ",
                "DepartureTime": "2024-08-15 10:00:00",
                "ArrivalTime": "2024-08-15 12:00:00",
                "FlightNumber": "AC1234"
              },
              {
                "Origin": "YYZ",
                "Destination": "LHR",
                "DepartureTime": "2024-08-15 18:00:00",
                "ArrivalTime": "2024-08-16 06:00:00",
                "FlightNumber": "AC5678"
              }
            ]
          }
        ],
        "CostBelowAverage": 300.00
      }
    }
  ]
};

const transformed = transformData(input);
console.log(transformed);
