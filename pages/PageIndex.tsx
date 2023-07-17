import {
  Image,
  Layout,
  LegacyCard,
  LegacyStack,
  Page,
  Text,
} from "@shopify/polaris";
import { useNavigate } from "react-router";
import trophyImgUrl from "../assets/home-trophy.png";
import mixpanel from "../lib/mixpanel";

const updateMixPanel = () => {
  mixpanel.then((mp) => {
    mp.track("Page Index View", {
      source: "Some source",
    });
  });
};

export default function PageIndex() {
  updateMixPanel();

  const navigate = useNavigate();

  return (
    <Page
      fullWidth
      breadcrumbs={[
        {
          content: "Back",
          onAction: () => navigate(-1),
        },
      ]}
    >
      <Layout>
        <Layout.Section>
          <LegacyCard sectioned>
            <LegacyStack
              wrap={false}
              spacing="extraTight"
              distribution="trailing"
              alignment="center"
            >
              <LegacyStack.Item fill>
                  <Text variant="headingMd" as="h1">
                    Page Index Example
                  </Text>
              </LegacyStack.Item>
              <LegacyStack.Item>
                <div style={{ padding: "0 20px" }}>
                  <Image
                    source={trophyImgUrl}
                    alt="Nice work on building a Shopify app"
                    width={120}
                  />
                </div>
              </LegacyStack.Item>
            </LegacyStack>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section secondary>
          <LegacyCard sectioned>
            <LegacyStack
              wrap={false}
              spacing="extraTight"
              distribution="trailing"
              alignment="center"
            >
              <LegacyStack.Item fill>
                  <Text variant="headingMd" as="h1">
                    Secondary Section
                  </Text>
              </LegacyStack.Item>
            </LegacyStack>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
