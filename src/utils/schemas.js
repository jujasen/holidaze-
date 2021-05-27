import * as yup from 'yup';

export const bookingSchema = yup.object().shape({
    fromDate: yup.date()
        .required("From date is required"),
    toDate: yup.date()
        .required("To date is required"),
    firstName: yup.string()
        .required("*First name is required"),
    lastName: yup.string()
        .required("*Last name is required"),
    email: yup.string()
        .email("*Email is invalid")
        .required("*Email is required"),
    phoneNumber: yup.number()
        .integer("*Phone number is invalid")
        .required("*Phone number is required"),
    request: yup.string()
});

export const contactSchema = yup.object().shape({
    name: yup.string()
        .required("Name is required")
        .min(2, "Name needs at least 2 characters"),
    email: yup.string()
        .email("*Email is invalid")
        .required("*Email is required"),
    subject: yup.string()
        .required("Subject is required")
        .min(2, "Subject needs at least 2 characters"),
    message: yup.string()
        .required("Message is required")
        .min(10, "Message needs at least 10 characters"),
});

export const validationSchema = yup.object().shape({
        name: yup.string()
            .required("Establishment name is required")
            .min(3, "Establishment name needs at least 3 characters"),
        type: yup.string()
            .required("*Establishment type is required"),
        stars: yup.number()
            .required("Stars are required"),
        region: yup.string()
            .required("Region is required"),
        street_adress: yup.string()
            .required("Street address is required")
            .min(5, "Street address needs at least 5 characters"),
        postal_adress: yup.string()
            .required("Postal adress is required"),
        zip_code: yup.string()
            .required("Zip code is required")
            .min(4, "Zip code must be 4 characters")
            .max(4, "Zip code must be 4 characters"),
        image: yup.string()
            .url("Not a valid url")
            .required("Image link is required"),
        map_embed: yup.string()
            .required("Map embed is required")
            .min(200, "Map embed needs at least 200 characters"),
        max_people: yup.number()
            .required("Max people is required"),
        room_standard_price: yup.number()
            .required("Standard room price is required")
            .integer("Not a number"),
        room_superior_price: yup.number(),
        room_luxury_price: yup.number(),
        breakfast_price: yup.number(),
    });