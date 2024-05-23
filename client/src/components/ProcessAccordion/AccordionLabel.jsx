import {Group, Avatar, Text} from "@mantine/core"
import {
  IconMapSearch,
  IconPencil,
  IconArrowsRandom,
  IconListDetails,
} from "@tabler/icons-react";

function AccordionLabel({ label, formattedDate, icon }) {
  
  const DynamicIcon = ({IconComponent}) => {

    if(IconComponent == "IconMapSearch"){
      return <IconMapSearch/>
    } else if (IconComponent == "IconPencil"){
      return <IconPencil/>
    } else if (IconComponent == "IconArrowsRandom"){
      return <IconArrowsRandom/>
    } else if(IconComponent == "IconListDetails"){
      return <IconListDetails/>
    }
  } 
  
  return (
    <Group wrap="nowrap" justify="space-between">
      <Group align="center">
        <DynamicIcon IconComponent={icon}/>
        <Group align="center">
          <Text size="lg">{label}</Text>
          <Text size="sm" c="dimmed" fw={400}>Updated: {formattedDate}</Text>
        </Group>
      </Group>
    </Group>
  );
}

export default AccordionLabel;