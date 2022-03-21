import { useEffect } from "react";
import { useState, useRef, createRef } from "react";

import useInterval from "../../hooks/useInterval";

import style from "./index.module.css";

const testContent: Item[] = [
  {
    author: "linus.bolls@code.berlin",
    channel: "#unrestricted-chat",
    color: "red",
    content: "0 amogus",
  },
  {
    author: "linus.bolls@code.berlin",
    channel: "#unrestricted-chat",
    color: "red",
    content: "1 amogus",
  },
  {
    author: "linus.bolls@code.berlin",
    channel: "#unrestricted-chat",
    color: "red",
    content: "2 amogus",
  },
  {
    author: "linus.bolls@code.berlin",
    channel: "#unrestricted-chat",
    color: "red",
    content: "3 amogus",
  },
  {
    author: "linus.bolls@code.berlin",
    channel: "#unrestricted-chat",
    color: "red",
    content: "4 amogus",
  },
];
interface Item {
  author: string;
  channel: string;
  color: string;
  content: string;
}
function TickerItem({
  item: { author, channel, color, content },
  reff,
  ...rest
}: {
  item: Item;
  reff: any;
  [key: string]: any;
}) {
  return (
    <div className={style.ticker__item} {...rest} ref={reff}>
      <span style={{ color }}>
        {author} @ {channel}
      </span>
      <p>{content}</p>
    </div>
  );
}
function isLeftOfScreen(el: any) {
  if (el == null) return false;

  const box = el.getBoundingClientRect();
  return box.x + box.width < 0;
}
function isFullyOnScreen(el: any) {
  if (el == null) return false;

  const box = el.getBoundingClientRect();
  return box.x + box.width < window?.innerWidth;
}
function Ticker() {
  const [content, setContent] = useState<Item[]>(testContent);
  const [sachen, setSachen] = useState<any[]>([]);

  function main() {
    setTimeout(main, 1000);

    const firstItem = sachen[0];
    const lastItem = sachen[sachen.length - 1];

    // console.log({ length: sachen.length, firstItem, lastItem });

    if (firstItem == null) {
      // console.log("spawning first item");
      return spawnItem(0);
    }
    if (isFullyOnScreen(lastItem.ref.current)) {
      const lastIdx = lastItem.idx;
      const nextIdx = lastIdx === content.length - 1 ? 0 : lastIdx + 1;
      // console.log("spawning item", nextIdx);
      spawnItem(nextIdx);
    }

    if (isLeftOfScreen(firstItem.ref.current)) {
      console.log("deleting");
      setSachen((prev) => prev.slice(1));
    }
  }
  function spawnItem(idx: number) {
    const ref = createRef();

    setSachen((prev) => {
      return [
        ...prev,
        {
          el: (
            <TickerItem
              item={content[idx]}
              reff={ref}
              key={Math.random() * 1000000}
            />
          ),
          ref,
          idx,
        },
      ];
    });
  }

  useInterval(main, 1000);

  return <div className={style.ticker}>{sachen.map((i) => i.el)}</div>;
}
export default Ticker;
