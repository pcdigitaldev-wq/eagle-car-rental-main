import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendEmail = async ({
  subject,
  text,
  to,
  html,
  dynamicData,
}: {
  to: string;
  subject: string;
  text: string;
  html?: string;
  dynamicData?: DynamicData;
}) => {
  try {
    await sendgrid.send({
      to,
      from: "info@eaglerentalcar.com", // Must be a verified email
      subject,
      text,
      html,
      templateId: "d-40e9cf6286454b92a49466c315e071dd",
      dynamicTemplateData: dynamicData,
    });

    console.log(`📨 Email sent to ${to}`);
    console.log(`Template ID::d-40e9cf6286454b92a49466c315e071dd}`);
    return { success: true };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return { success: false, error };
  }
};
export const sendContactEmail = async ({
  subject,
  text,
  to,
  html,

}: {
  to: string;
  subject: string;
  text: string;
  html?: string;

}) => {
  try {
    await sendgrid.send({
      to,
      from: "info@eaglerentalcar.com", // Must be a verified email
      subject,
      text,
      html,
    });

    console.log(`📨 Email sent to ${to}`);
    return { success: true };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return { success: false, error };
  }
};

export default sendEmail;

export type DynamicData = {
  fullName: string;
  carName: string;
  bookingID: string;
  bookingDate: string;
  startDate: string;
  endDate: string;
  paymentMethod: string;
  paid: string;
  totalAmount: string;
  email: string; // for the booking link
};
