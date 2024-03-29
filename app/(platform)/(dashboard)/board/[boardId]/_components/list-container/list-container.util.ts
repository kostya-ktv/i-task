import { updateCardOrder } from "@/actions/card";
import { updateListOrder } from "@/actions/list/update-list-order";
import { DragDropUtil } from "@/lib/dnd";
import { ListWithCards } from "@/lib/types";
import { DropResult } from "@hello-pangea/dnd";
import { Board } from "@prisma/client";

export namespace ListContainerUtil {
  export const reorder = <T>(
    list: T[],
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  interface OnDragEndProps {
    result: DropResult;
    boardId: Board["id"];
    initialData: ListWithCards[];
    onChange(list: ListWithCards[]): void;
  }
  export const onDragEnd = async (props: OnDragEndProps) => {
    const { boardId, initialData, onChange, result } = props;
    const { destination, source, type } = result;
    if (!destination) return;

    //if dropped in the same position

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // user moves a list
    if (type === DragDropUtil.Type.list) {
      const items = ListContainerUtil.reorder(
        initialData,
        source.index,
        destination.index
      ).map((el, i) => ({ ...el, order: i }));

      onChange(items);
      await updateListOrder({ boardId, items });
    }
    // use moves a card
    if (type === DragDropUtil.Type.card) {
      let newOrderedData = [...initialData];
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );
      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destList) return;

      // checking if cards exists on sourceList
      if (!sourceList.cards) sourceList.cards = [];
      // checking if cards exists on destList
      if (!destList.cards) destList.cards = [];

      //Moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );
        reorderedCards.forEach((card, cardIndex) => (card.order = cardIndex));

        sourceList.cards = reorderedCards;
        onChange(newOrderedData);
        await updateCardOrder({
          boardId: boardId,
          items: reorderedCards,
        });
      } else {
        //if user moves the card to another list
        //remove card from source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);
        movedCard.listId = destination.droppableId;
        //inserting
        destList.cards.splice(destination.index, 0, movedCard);
        sourceList.cards.forEach((card, cardIndex) => {
          card.order = cardIndex;
        });

        //now we need update order for each card in dest list
        destList.cards.forEach((card, cardIndex) => {
          card.order = cardIndex;
        });
      }

      onChange(newOrderedData);
      await updateCardOrder({
        boardId: boardId,
        items: destList.cards,
      });
    }
  };
}
