import { Group, Accordion, Badge } from "@mantine/core";
import AccordionLabel from "./AccordionLabel";
import ProcessContent from "../ProcessContent"

function AccordionItem({ dataArray, searchTerm, filterFlags }) {
  //Filter from dataArray processes that do not match the search terms based on title or content
  const filteredProcesses = dataArray.filter((process) => {
    const matchesSearchTerms =
      process.processTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.processText.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesFilter = true;
    if (filterFlags == true && process.populatedFlags.length < 1) {
      matchesFilter = false;
    }
    return matchesSearchTerms && matchesFilter;
  });

  return filteredProcesses.map((contentData) => (
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

            {contentData.populatedFlags.length > 0 && (
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
            pageRedirect={true}
          />
        </Accordion.Panel>
      </Accordion.Item>
    </Group>
  ));
}

export default AccordionItem;
