import React from "react";
// import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/esm/Row";
import PatientData from '../patientData';
import Anamnesis from '../anamnesis';
import ConclusionApp from '../conclusionApp';

function Appointment(props) {
    const patientExample = {
        name: "Michelle",
        lastName: "Dalala",
        sex: "F",
        birthDate: "1990-01-01",
        email: "mich.dal@gmail.com",
        city: "Buenos Aires",
        lastApp: "2021-01-01",
        nextApp: "2023-01-01",
        lastIssues: "Logoden biniou degemer mat an penn ar bed Moel, Montroulez lamp dirak  envel tachenn c’haol ni chal a-raok , goulenn bloavezh c’hwec’hvet ar rumm ha izel. Hag stal ouzhit mamm jod sav garmiñ pegen e c’houlz tad Gwaien ti gwerenn, Montroulez skiant dor galon stouiñ dant mel doñv rodell troc’hañ plijout. Las goleiñ c’hwec’hvet pesketa hent war nec’hin c’hoant kazh, gwengolo mervel c’hof niverenn Muzilheg kotoñs kambrig azezañ voger, Pornizhan ganto anezho beuziñ arabat vuhez penn. Padout Liger droug kenañ voutailh neuze eured evel  brudet, laezh pevarzek a gador tresañ ur Pempont hervez  skouarn, Doue pe mevel a-raok  am c’huzh naontek. Uhelder stivell tal darev ivin kavout galon noz nevez muiañ krib siminal genou galleg, keniterv mintin adarre Lokmikael (an-Traezh) flourañ a-raok  gallek c’hilhog betek ur marv. Vourc’h ni Naoned priz Ar Vouster gouere nebeutoc’h sailh romant, bed geot Lokmikael (an-Traezh) netra heñvel mouchouer garm kontrol mouezh, d’a votez mousc’hoarzhin a e ha biken. Reizh degas ijinañ koll houlenn derc’hent patatez siminal evel, fresk bleud ennon glav setu waz peurvuiañ ur tenn, c’hoarvezout kerf Santeg ar deiz speredek c’horn. E c’hroaz war skignañ tresañ c’heuz muioc’h dir bugale, dit beajour Tregastell lonkañ war drezo teñvalijenn bennak gwinegr, dant teurel gervel uhel siwazh Malo blijadur. Eta Chrouer lies meur hep kaer kêr greiz Rosko, gomz ac'hanoc'h bras dor c’hezeg c’hleñved skubañ dorn gwengolo, c’hig tresañ c’houevr naet Pempont metrad leskiñ. Chase chaseour dirak  dan houad gorre nevez logod dorn, un an dor oferenn war c’hi Ar Vouster tiegezh hejañ, pod giz kazetenn gozh karout dale huanadiñ."
    }

    return (
        <div className="appointment">
            <h1>Appointment</h1>

            <PatientData patient={patientExample} />

            <Anamnesis />

            <ConclusionApp />

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </div>
    )
}

export default Appointment;