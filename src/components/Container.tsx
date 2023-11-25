import "../styles/Container.css"
import { useState, useRef } from "react"
import download from "../assets/download.svg"
import generatePDF, { Margin } from "react-to-pdf"
import Information from "./Information"
import Header from "./Header"
import Personal from "./Personal"
import Education from "./Education"
import Work from "./Work"
import PersonalPreview from "./PersonalPreview"
import EducationPreview from "./EducationPreview"
import WorkPreview from "./WorkPreview"

interface Personal {
  name: string
  birthday: string
  email: string
  number: string
}

interface Education {
  school: string
  study: string
  startDate: string
  endDate: string
}

interface Work {
  company: string
  position: string
  description: string
  startDate: string
  endDate: string
}

function Container() {
  const [personalInfo, setPersonalInfo] = useState<Personal | null>(null)
  const [educationInfo, setEducationInfo] = useState<Education | null>(null)
  const [workInfo, setWorkInfo] = useState<Work | null>(null)

  function receivePersonal(information: Personal) {
    setPersonalInfo(information)
    console.log("DATA IS", personalInfo)
  }

  function receiveEducation(information: Education) {
    setEducationInfo(information)
    console.log("DATA IS", personalInfo)
  }

  function receiveWork(information: Work) {
    setWorkInfo(information)
    console.log("WORK IS", information)
  }

  const targetRef = useRef(null)

  return (
    <div className='container'>
      <Information>
        <Header>
          <button
            onClick={() =>
              generatePDF(targetRef, {
                method: "open",
                page: { margin: Margin.MEDIUM },
              })
            }
          >
            {" "}
            <img src={download} alt='download' />
            Download
          </button>
        </Header>
        <Personal receivePersonal={receivePersonal} />
        <Education receiveEducation={receiveEducation} />
        <Work receiveWork={receiveWork} />
      </Information>
      <div className='cv-preview' ref={targetRef}>
        {personalInfo ? <PersonalPreview personal={personalInfo} /> : null}
        {educationInfo ? <EducationPreview education={educationInfo} /> : null}
        {workInfo ? <WorkPreview work={workInfo} /> : null}
      </div>
    </div>
  )
}

export default Container
