"use client";

import React, { useState, useEffect, useRef } from "react";
// @ts-expect-error - no types available
import { CameraEnhancer } from "dynamsoft-camera-enhancer";
// @ts-expect-error - no types available
import { PlayCallbackInfo } from "dynamsoft-camera-enhancer/dist/types/interface/playcallbackinfo";
// @ts-expect-error - no types available
import { TextResult, BarcodeReader } from "dynamsoft-javascript-barcode";
import { redirect } from "next/navigation";

interface ScannerProps {
  isActive?: boolean;
  children?: React.ReactNode;
  interval?: number;
  license?: string;
  onInitialized?: (enhancer: CameraEnhancer, reader: BarcodeReader) => void;
  onScanned?: (results: TextResult[]) => void;
  onPlayed?: (playCallbackInfo: PlayCallbackInfo) => void;
  onClosed?: () => void;
}

export default function BarcodeScannerComponent({
  addIsbnToDb,
}: {
  addIsbnToDb: (FormData: FormData) => void;
}) {
  const [isActive, setIsActive] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const toggleScanning = () => {
    setIsActive(!isActive);
  };

  const onScanned = async (results: TextResult[]) => {
    if (results.length > 0) {
      let text = "";
      for (let index = 0; index < results.length; index++) {
        const result = results[index];
        text =
          text + result.barcodeFormatString + ": " + result.barcodeText + "\n";
      }
      const formData = new FormData();
      formData.append("isbn", results[0].barcodeText);
      setIsActive(false);
      await addIsbnToDb(formData);

      redirect("/");
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {initialized ? (
        <button
          onClick={toggleScanning}
          className="bg-brand-brown text-white px-4 py-2 rounded-md"
        >
          {isActive ? "Stop Scanning" : "Scan a Barcode"}
        </button>
      ) : (
        <div>Initializing...</div>
      )}
      <div className="w-full p-8">
        <BarcodeScanner
          onInitialized={() => setInitialized(true)}
          isActive={isActive}
          onScanned={onScanned}
        />
      </div>
    </div>
  );
}

const BarcodeScanner: React.FC<ScannerProps> = (props) => {
  const mounted = useRef(false);
  const container = useRef<HTMLDivElement>(null);
  const enhancer = useRef<CameraEnhancer>(null);
  const reader = useRef<BarcodeReader>(null);
  const interval = useRef<NodeJS.Timeout | null>(null);
  const decoding = useRef(false);

  useEffect(() => {
    const init = async () => {
      if (BarcodeReader.isWasmLoaded() === false) {
        BarcodeReader.license = "";
        BarcodeReader.engineResourcePath =
          "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@9.6.11/dist/";
      }
      reader.current = await BarcodeReader.createInstance();
      enhancer.current = await CameraEnhancer.createInstance();
      if (container.current) {
        await enhancer.current.setUIElement(container.current);
      }
      enhancer.current.on("played", (playCallbackInfo: PlayCallbackInfo) => {
        if (props.onPlayed) {
          props.onPlayed(playCallbackInfo);
        }
        startScanning();
      });
      enhancer.current.on("cameraClose", () => {
        if (props.onClosed) {
          props.onClosed();
        }
      });
      enhancer.current.setVideoFit("cover");
      if (props.onInitialized) {
        props.onInitialized(enhancer.current, reader.current);
      }

      toggleCamera();
    };
    if (mounted.current === false) {
      init();
    }
    mounted.current = true;

    return () => {
      stopScanning();
      enhancer.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleCamera = () => {
    if (mounted.current === true) {
      if (props.isActive === true) {
        enhancer.current?.open(true);
      } else {
        stopScanning();
        enhancer.current?.close();
      }
    }
  };

  useEffect(() => {
    toggleCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isActive]);

  const startScanning = () => {
    const decode = async () => {
      if (decoding.current === false && reader.current && enhancer.current) {
        decoding.current = true;
        const results = await reader.current.decode(
          enhancer.current.getFrame()
        );
        if (props.onScanned) {
          props.onScanned(results);
        }
        decoding.current = false;
      }
    };
    if (props.interval) {
      interval.current = setInterval(decode, props.interval);
    } else {
      interval.current = setInterval(decode, 40);
    }
  };

  const stopScanning = () => {
    if (interval.current) {
      clearInterval(interval.current);
    }
  };

  return (
    <div ref={container} className="min-h-[200px] w-full relative">
      <div className="dce-video-container"></div>
      {props.children}
    </div>
  );
};
