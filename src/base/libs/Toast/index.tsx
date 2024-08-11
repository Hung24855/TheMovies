"use client";
import { delay } from "@/base/utils/delay";
import React, { useEffect, useState } from "react";

export default function Toast({
  message,
  type="success",
  show,
}: {
  message: string;
  type?: "success" | "error";
  show: boolean;
}) {
  const [isShow, setIsShow] = useState(show);

  useEffect(() => {
    (async () => {
      if (isShow) {
        await delay(1500);
        setIsShow(false);
      }
    })();
  }, [isShow]);

  return (
    <>
      {isShow && (
        <div className="fixed bottom-4 right-3 rounded-md bg-red-600 p-2">
          {message}
        </div>
      )}
    </>
  );
}
