import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { BsLaptop } from 'react-icons/bs';
import experienceData from 'src/assets/experience.json';
import { Experience } from 'src/common/types';
import COLORS from 'src/common/colors';
import DividierLine from 'src/components/common/DividerLine.component';
import { useContext, useEffect, useRef } from 'react';
import useIsInViewport from 'src/common/helpers';
import { PagePositionEnum } from 'src/common/enums';
import PagePositionContext from 'src/context/PagePosition.context';

function ExperienceScreen(): JSX.Element {
  const experience: Experience[] = experienceData;
  const experienceRef = useRef<HTMLDivElement>(null);
  const isInViewport = useIsInViewport(experienceRef, '-50%');

  const { setCurrentPosition } = useContext(PagePositionContext);

  useEffect(() => {
    if (isInViewport) {
      setCurrentPosition(PagePositionEnum.Experience);
    }
  }, [isInViewport, setCurrentPosition]);

  return (
    <div
      id="experience"
      className="experience-container container flex flex-col justify-center items-center "
    >
      <DividierLine />
      <h2
        className="text-xl mb-3"
        style={{ color: COLORS.alternativeTextColor }}
        ref={experienceRef}
      >
        Where I&apos;ve Worked
      </h2>
      <div className="w-3/4">
        <VerticalTimeline lineColor={`${COLORS.alternativeTextColor}`}>
          {experience.map((e) => {
            return (
              <VerticalTimelineElement
                key={e.id}
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: COLORS.alternativeBgColor,
                  color: COLORS.alternativeTextColor,
                }}
                contentArrowStyle={{
                  borderRight: `7px solid ${COLORS.alternativeTextColor}`,
                }}
                date={`${e.start} - ${e.end} `}
                iconStyle={{
                  background: COLORS.alternativeBgColor,
                  color: COLORS.alternativeTextColor,
                }}
                icon={<BsLaptop />}
              >
                <h3
                  className="vertical-timeline-element-title"
                  style={{ color: COLORS.mainTextColor }}
                >
                  {e.position}
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  @{' '}
                  <a
                    className="experience-company-link"
                    href={e.companyLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {e.company}
                  </a>
                </h4>
                <p style={{ color: COLORS.alternativeTextColor }}>
                  {e.description.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </p>
              </VerticalTimelineElement>
            );
          })}
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default ExperienceScreen;