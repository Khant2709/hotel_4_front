import React from "react";

import HeaderLineBackground from "../../../../components/ui/headerLineBackgrund/headerLineBackground";

import {jsonLDTrackPage} from "../../../../data/seoData";
import {metaDataTrackPage} from "../../../../data/metaData";
import ContentTrackBusPage from "./content";

export const metadata = metaDataTrackPage;

const PageTrackBus = () => {


    return (
        <section>
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLDTrackPage)}}/>
            <HeaderLineBackground display={true}/>
            <ContentTrackBusPage/>
        </section>
    );
};

export default PageTrackBus;
