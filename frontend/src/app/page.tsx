import Header from "@/components/main/Header";
import Main from "@/components/main/Main";
import History from "@/components/main/History";
import Faq from "@/components/main/Faq";
import React from "react";
import {DataProvider} from "@/context/DataProvider";

export default function Home() {
  return (
    <DataProvider>
        <Header/>
        <Main/>
        <History/>
        <Faq/>
    </DataProvider>
  );
}
