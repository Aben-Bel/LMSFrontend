import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

function Note(props) {
  const markdown = `
  # Aequora participes

## Illa arsit alas criminis litore

Lorem markdownum intexto. Tum quoque, calido fortuna. *Credis mea*, et adsit.

Mox atque, sit tela deum intus paratur [opibus](http://senectusratis.com/)
nimium agitabilis moveri. Caesosque furtim!

## Ponit est pectora poenas laterumque

Rapimur quoque regionibus ducibus, Parthaoniae temeraria *nec sensit* cum
pedibus memoro *obsistere* vanos. His et in creatis inque *et capacis* manum
vellem nubila. Provolat vestras, nec fecerat Saturnia Boreas Ampycides repetatne
fecerat. Quaecumque palla, metu emittite ad digerit aderat, parentes, sed genu
auctorem ut harenis quaque exorabilis!

    if (megabyte.card(truncate_switch_gps, 762770, 5)) {
        scsi.processorJpegGoodput = keywordsPrimaryZettabyte;
        footerSkuConfiguration(refreshPciSecondary(technologyBarcraft,
                mms_dslam, mask));
    } else {
        animated.development_password = multimedia;
    }
    server_redundancy_keywords(cdnSanPhreaking, iso(cmyk, 939236 * 2),
            keywordsExport(add_uml, mbr));
    right_thin_target = class(spoolNetbios(hsf_vrml_byte, correction_worm_mbps),
            client) * goldenRt + engineServerFrequency(webBit, -3, prom);

## Acti languor innitens Thracius lacerare petis

Times illa adfuit utque **cum** hostem qua arcum temperius adhuc.
[Templum](http://www.luebat.net/) vosque. Pars *nec* nec tamen non, altae est
quoque [pectore](http://dicemur.org/); mora undis socer imponit Ceycis, nec.
Abantiades sibi de vices cava cecidit tamen me capillis cumque, quattuor. Phoco
Sospite callida leto iungat facies **cingebant**, malignas exercent Tantalus
altissima auctor.

Quo habitu traxit ilice secus cuncti, thalamos iamdudum proles, fruges,
*superest murice*. Novo ambas quae dicite, det *comaeque* quam lurida et lassa
lacrimas temptat, aevo. Septem nisi, incipere vagantur fugit, cum fuit tamen et
Plurima tamen cupit montibus arcebat.

## Radicibus in summa ficta functa vocabis

Artes verba et dira prohibebar magno iurares, proprias i *vires toris* flagellis
*devicto*. Fata quam et illo moderere ut nec putes et mollit.

Sederunt est vides [quoniam](http://www.equumque.net/iussi.html), acuti! Ipse
columnae terram, post orbem moriente profuit, qua hoc sede et obvertit adhuc
*fortunam* malo noctes specie! Adhuc adspicit, videor subit nobilitate auras,
procul nec. Graciles dabunt infringat isdem tangor, colentes spes: *iuvenem*
Lernaeae pinnis, communis iuventus, maesta?
`;

  return <ReactMarkdown remarkPlugins={[gfm]} children={markdown} />;
}
export default Note;
