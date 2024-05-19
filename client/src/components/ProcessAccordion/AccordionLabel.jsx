import {Group, Avatar, Text} from "@mantine/core"
import {IconMapSearch} from "@tabler/icons-react"

function AccordionLabel({ label, formattedDate }) {
  
  return (
    <Group wrap="nowrap" justify="space-between">
      <Group>
        <IconMapSearch size={24}/>
        <div>
          <Text size="xl">{label}</Text>
          <Text size="sm" c="dimmed" fw={400}>Updated: {formattedDate}</Text>
        </div>
      </Group>
    </Group>
  );
}

export default AccordionLabel;