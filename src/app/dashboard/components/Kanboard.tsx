"use client";

import { useState } from "react";
import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { gray, slate } from "@/theme/Color";

// Types
type Job = {
  id: string;
  company: string;
  position: string;
};

type ColumnKey = "applied" | "interview" | "offer" | "rejected";

type Columns = {
  [key in ColumnKey]: Job[];
};

// Initial Data
const initialData: Columns = {
  applied: [
    { id: "1", company: "Google", position: "Frontend Dev" },
    { id: "2", company: "Amazon", position: "React Dev" },
  ],
  interview: [{ id: "3", company: "Meta", position: "UI Engineer" }],
  offer: [],
  rejected: [],
};

const columnTitles: Record<ColumnKey, string> = {
  applied: "Applied",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
};

// export default function KanbanBoard() {
//   const [data, setData] = useState<Columns>(initialData);

//   const onDragEnd = (result: DropResult) => {
//   const { source, destination } = result;
//   if (!destination) return;

//   const sourceId = source.droppableId as ColumnKey;
//   const destId = destination.droppableId as ColumnKey;

//   // No movement
//   if (sourceId === destId && source.index === destination.index) return;

//   // Make copies
//   const sourceColumn = Array.from(data[sourceId]);
//   const destColumn = sourceId === destId ? sourceColumn : Array.from(data[destId]);

//   // Remove item from source
//   const [movedItem] = sourceColumn.splice(source.index, 1);

//   // Insert into destination
//   destColumn.splice(destination.index, 0, movedItem);

//   // Update state
//   setData((prev) => ({
//     ...prev,
//     [sourceId]: sourceId === destId ? destColumn : sourceColumn,
//     [destId]: destColumn,
//   }));
// };

// //  const onDragEnd = (result: DropResult) => {
// //   const { source, destination } = result;
// //   if (!destination) return;

// //   const sourceId = source.droppableId as ColumnKey;
// //   const destId = destination.droppableId as ColumnKey;

// //   // No move
// //   if (sourceId === destId && source.index === destination.index) return;

// //   const sourceColumn = Array.from(data[sourceId]);
// //   const destColumn = Array.from(data[destId]);
// //   const [movedItem] = sourceColumn.splice(source.index, 1);

// //   if (sourceId === destId) {
// //     // Dragging inside the same column
// //     sourceColumn.splice(destination.index, 0, movedItem);
// //     setData({
// //       ...data,
// //       [sourceId]: sourceColumn,
// //     });
// //   } else {
// //     // Dragging across different columns
// //     destColumn.splice(destination.index, 0, movedItem);
// //     setData({
// //       ...data,
// //       [sourceId]: sourceColumn,
// //       [destId]: destColumn,
// //     });
// //   }
// // };

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <Box sx={{ display: "flex", gap: 4, p: 3, flexWrap: "wrap" }}>
//         {Object.keys(data).map((colKey) => {
//           const columnKey = colKey as ColumnKey;
//           return (
//             <Droppable droppableId={columnKey} key={columnKey}>
//               {(provided) => (
//                 <Box
//                   ref={provided.innerRef}
//                   {...provided.droppableProps}
//                   sx={{
//                     width: 280,
//                     minHeight: 400,
//                     background: "#f5f5f5",
//                     p: 2,
//                     borderRadius: 2,
//                   }}
//                 >
//                   <Typography variant="h6" sx={{ mb: 2 }}>
//                     {columnTitles[columnKey]}
//                   </Typography>

//                   {data[columnKey].map((item, index) => (
//                     <Draggable key={item.id} draggableId={item.id} index={index}>
//                       {(prov) => (
//                         <Card
//                           ref={prov.innerRef}
//                           {...prov.draggableProps}
//                           {...prov.dragHandleProps}
//                           sx={{ mb: 2, cursor: "grab", userSelect: "none" }}
//                         >
//                           <CardContent>
//                             <Typography fontWeight="bold">{item.company}</Typography>
//                             <Typography variant="body2" color="text.secondary">
//                               {item.position}
//                             </Typography>
//                           </CardContent>
//                         </Card>
//                       )}
//                     </Draggable>
//                   ))}

//                   {provided.placeholder}
//                 </Box>
//               )}
//             </Droppable>
//           );
//         })}
//       </Box>
//     </DragDropContext>
//   );
// }

export default function KanbanBoard() {
  const theme = useTheme();
  const [data, setData] = useState<Columns>(initialData);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceId = source.droppableId as ColumnKey;
    const destId = destination.droppableId as ColumnKey;

    // No movement
    if (sourceId === destId && source.index === destination.index) return;

    setData((prev) => {
      // Copy the source and destination arrays
      const sourceItems = Array.from(prev[sourceId]);
      const destItems = Array.from(prev[destId]);

      // Remove the dragged item
      const [movedItem] = sourceItems.splice(source.index, 1);

      // Add to destination
      destItems.splice(destination.index, 0, movedItem);

      return {
        ...prev,
        [sourceId]: sourceId === destId ? destItems : sourceItems,
        [destId]: destItems,
      };
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={{ display: "flex", gap: 4, p: 3, flexWrap: "wrap" }}>
        {Object.keys(data).map((key) => {
          const columnKey = key as ColumnKey;
          return (
            <Droppable droppableId={columnKey} key={columnKey}>
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{
                    width: 280,
                    minHeight: 400,
                    backgroundColor:
                      theme.palette.mode === "dark" ? slate[700] : gray[800],
                    // p: 2,
                    borderRadius: 2,
                    position: "relative",
                    boxShadow: 2,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "skyblue",
                      color: "white",
                      px: 3,
                      py: 1,
                      borderTopRightRadius: 2,
                      borderTopLeftRadius: 2,
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{ mb: 2, zIndex: 1100, textAlign: "center" }}
                    >
                      {columnTitles[columnKey]}
                    </Typography>
                  </Box>

                  <Box sx={{p:2}}>
                    {data[columnKey].map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(prov) => (
                          <Card
                            ref={prov.innerRef}
                            {...prov.draggableProps}
                            {...prov.dragHandleProps}
                            sx={{
                              mb: 2,
                              cursor: "grab",
                              userSelect: "none",
                            }}
                          >
                            <CardContent>
                              <Typography fontWeight="bold">
                                {item.company}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {item.position}
                              </Typography>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                  </Box>

                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          );
        })}
      </Box>
    </DragDropContext>
  );
}
