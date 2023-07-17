import { useEffect, useState } from "react";
import {
  Page,
  Layout,
  Card,
  Button,
  FormLayout,
  TextField,
} from "@shopify/polaris";
import { useAuthenticatedFetch } from "../hooks";
import mixpanel from "../lib/mixpanel";
import { Shop, ShopData } from "../../@types/shop";
import { Toast } from "@shopify/app-bridge-react";
export default function PageName() {
  const emptyToastProps = { content: "" };
  const [isLoading, setIsLoading] = useState(true);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const [formState, setFormState] = useState({
    authKey: "",
    brandId: "",
    sameDayDeliveryName: "",
    sameDayDescription: "",
    nextDayDeliveryName: "",
    nextDayDescription: "",
    timeLimit: "",
  });
  const fetch = useAuthenticatedFetch();

  const handleChange = (field: string, value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const toastMarkup = toastProps.content && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );
  useEffect(() => {
    (async () => {
      const shop: Shop = await fetch("/api/shop/info").then((res) =>
        res.json()
      );
      const updatedFormState = { ...formState };
      for (const f in formState) {
        updatedFormState[f] = shop.shopData[f] as string;
      }
      setFormState(updatedFormState);
    })();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/shop/update-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        console.log("Form submitted", formState);
        const responseData = await response.json();
        console.log("Response:", responseData);
        setToastProps({
          content: "Submited sucessfully",
        });

        // Handle the response as needed
      } else {
        console.error("Error:", response.statusText);
        // Handle the error
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle the error
    }
    setIsLoading(false);
  };

  return (
    <Page>
      {toastMarkup}
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <FormLayout>
              <TextField
                label="Auth Key"
                value={formState.authKey}
                onChange={(value) => handleChange("authKey", value)}
              />
              <TextField
                label="Brand Id"
                value={formState.brandId}
                onChange={(value) => handleChange("brandId", value)}
              />
              <TextField
                label="Same Day Delivery Name"
                value={formState.sameDayDeliveryName}
                onChange={(value) => handleChange("sameDayDeliveryName", value)}
              />
              <TextField
                label="Same Day delivery Description"
                value={formState.sameDayDescription}
                onChange={(value) => handleChange("sameDayDescription", value)}
              />
              <TextField
                label="Next Day Delivery Name"
                value={formState.nextDayDeliveryName}
                onChange={(value) => handleChange("nextDayDeliveryName", value)}
              />
              <TextField
                label="Next Day Delivery Description"
                value={formState.nextDayDescription}
                onChange={(value) => handleChange("nextDayDescription", value)}
              />
              <TextField
                label="Last Hour of the day"
                value={formState.timeLimit}
                onChange={(value) => handleChange("timeLimit", value)}
              />
              <Button onClick={handleSubmit} primary>
                Submit
              </Button>
            </FormLayout>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
