import { Group, Accordion, Badge } from "@mantine/core";
import AccordionLabel from "./AccordionLabel";
import ProcessContent from "../ProcessContent"
import {useAuth} from "../../utils/AppContext"

function AccordionItem({ dataArray}) {
  //Admin status
  const { userProfile } = useAuth();

  return dataArray.map((contentData) => (
    <Group key={contentData._id} m={4}>
      <Accordion.Item
        className="item"
        variant="accordionDetail"
        value={contentData.processTitle}
        w="90%"
      >
        <Accordion.Control className="control">
          <Group justify="space-between">
            <AccordionLabel
              label={contentData.processTitle}
              formattedDate={contentData.formattedDate}
              description={contentData.processText}
              icon={contentData.processSubCategory}
            />
            
            {contentData.populatedFlags.length > 0 && userProfile.moderator && (
              <Badge color="red.4" mr={10}>
                Flagged
              </Badge>
            )}
            
          </Group>
        </Accordion.Control>
        <Accordion.Panel>
          <ProcessContent
            contentData={contentData}
            flagData={contentData.populatedFlags}
            referenceProcessData={contentData.populatedReferenceProcesses}
            pageRedirect={true}
          />
        </Accordion.Panel>
      </Accordion.Item>
    </Group>
  ));
}

export default AccordionItem;
