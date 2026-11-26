import type {Metadata} from 'next';
import Intake from '../components/Intake';
import '../intake.css';
// Unlisted page: no links point here and search engines are told to stay away.
export const metadata:Metadata={title:'Before we talk | TMAutomations',description:'A few questions before our call.',robots:{index:false,follow:false}};
export default function Intro(){return <Intake/>;}
