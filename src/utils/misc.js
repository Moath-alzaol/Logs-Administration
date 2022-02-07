export const handleResponse = ({ success, ...rest }) => ({ success, ...rest });

export const mapSelectData = (data) =>
    Array.isArray(data)
        ? data.map(({ name: label, id: value, ...rest }) => ({
              value,
              label,
              ...rest,
          }))
        : [];

export const fakeData = [
    { name: "Kempinski Hotel Mall of the Emirates", price: "200", city: "dubai", available_on: "2022-10-21" },
    { name: "Address Dubai Mall", price: "250", city: "dubai", available_on: "2022-08-15" },
    { name: "JW Marriott Marquis Hotel Dubai", price: "225", city: "dubai", available_on: "2023-09-21" },
    { name: "Hilton Dubai Al Habtoor City", price: "275", city: "dubai", available_on: "2022-10-25" },
    { name: "Sofitel Dubai Downtown", price: "300", city: "dubai", available_on: "2022-09-20" },
    { name: "Renaissance Downtown Hotel", price: "200", city: "dubai", available_on: "2022-10-23" },
    { name: "Sofitel Dubai Jumeirah Beach", price: "250", city: "dubai", available_on: "2022-09-20" },
    { name: "Ramada Downtown Dubai", price: "225", city: "dubai", available_on: "2022-09-25" },
    { name: "Sheraton Mall of the Emirates Hotel", price: "325", city: "dubai", available_on: "2022-10-24" },
    { name: "Emirates Grand Hotel Apartments", price: "300", city: "dubai", available_on: "2022-10-27" },
    { name: "Kempinski Hotel Mall of the Emirates", price: "200", city: "dubai", available_on: "2022-10-21" },
    { name: "Address Dubai Mall", price: "250", city: "dubai", available_on: "2022-08-15" },
    { name: "JW Marriott Marquis Hotel Dubai", price: "225", city: "dubai", available_on: "2023-09-21" },
    { name: "Hilton Dubai Al Habtoor City", price: "275", city: "dubai", available_on: "2022-10-25" },
    { name: "Sofitel Dubai Downtown", price: "300", city: "dubai", available_on: "2022-09-20" },
    { name: "Renaissance Downtown Hotel", price: "200", city: "dubai", available_on: "2022-10-23" },
    { name: "Sofitel Dubai Jumeirah Beach", price: "250", city: "dubai", available_on: "2022-09-20" },
    { name: "Ramada Downtown Dubai", price: "225", city: "dubai", available_on: "2022-09-25" },
    { name: "Sheraton Mall of the Emirates Hotel", price: "325", city: "dubai", available_on: "2022-10-24" },
    { name: "Emirates Grand Hotel Apartments", price: "300", city: "dubai", available_on: "2022-10-27" },
    { name: "Kempinski Hotel Mall of the Emirates", price: "200", city: "dubai", available_on: "2022-10-21" },
    { name: "Address Dubai Mall", price: "250", city: "dubai", available_on: "2022-08-15" },
    { name: "JW Marriott Marquis Hotel Dubai", price: "225", city: "dubai", available_on: "2023-09-21" },
    { name: "Hilton Dubai Al Habtoor City", price: "275", city: "dubai", available_on: "2022-10-25" },
    { name: "Sofitel Dubai Downtown", price: "300", city: "dubai", available_on: "2022-09-20" },
    { name: "Renaissance Downtown Hotel", price: "200", city: "dubai", available_on: "2022-10-23" },
    { name: "Sofitel Dubai Jumeirah Beach", price: "250", city: "dubai", available_on: "2022-09-20" },
    { name: "Ramada Downtown Dubai", price: "225", city: "dubai", available_on: "2022-09-25" },
    { name: "Sheraton Mall of the Emirates Hotel", price: "325", city: "dubai", available_on: "2022-10-24" },
];
