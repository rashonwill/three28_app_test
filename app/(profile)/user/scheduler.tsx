import { Fragment, useState, useEffect } from 'react'
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  MapPinIcon,
} from '@heroicons/react/20/solid';
import { Menu, Transition } from '@headlessui/react';
import Button from '@/components/atoms/button';
import { format, compareAsc, startOfToday, startOfMonth, endOfMonth, endOfWeek, startOfWeek, eachDayOfInterval, isEqual, isToday, isSameMonth, add, parse, getDay, parseISO, isSameDay } from 'date-fns'
import Typography from '@/components/atoms/typography';
import ScheduleModal from './schedule-modal';



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  let today = startOfToday();

  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMMM-yyyy'));
  let firstDayCurrentMonth = parse(currentMonth, 'MMMM-yyyy', new Date());
  let days = eachDayOfInterval({start: startOfWeek(firstDayCurrentMonth), end: endOfWeek(endOfMonth(firstDayCurrentMonth))})
  const [meetings, setMeetings] = useState([]);
  const [requstedMeetngs, setRequestedMeetings] = useState([]);
  function nextMonth(){
    let firstDayNextMonth = add(firstDayCurrentMonth, {months: 1});
    setCurrentMonth(format(firstDayNextMonth, 'MMMM-yyyy'))
  }

    function previousMonth(){
    let firstDayNextMonth = add(firstDayCurrentMonth, {months: -1});
    setCurrentMonth(format(firstDayNextMonth, 'MMMM-yyyy'))
  }

  let selectedDayMeetings = meetings.filter((meeting) => isSameDay(parseISO(meeting.date_time), selectedDay));

  let requestedDayMeetings = requstedMeetngs.filter((meeting) => isSameDay(parseISO(meeting.date_time), selectedDay));	

 const setRequestor = (e: any, requestorid: any, meetingid: any) => {
    localStorage.setItem('requestorID', requestorid);
    localStorage.setItem('meetingID', meetingid)	 
  };
	

	
async function getMeetings(){
  let channelid = localStorage.getItem('channelID')
  // const FARI_API = 'https://www.fariapi.com/api';
  const FARI_API = 'https://fari-prod.herokuapp.com/api';
  const myToken = localStorage.getItem("fariToken");	
try {
      const response = await fetch(
        `${FARI_API}/users/my-meetings/${channelid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
	    Authorization: `Bearer ${myToken}`,
          },
        }
      );
      const data = await response.json();
	setMeetings(data.meetings)
	return data.meetings
    } catch (error) {
     console.log(error)
    }	  
  }



async function getMeetingRequest(){
  let channelid = localStorage.getItem('channelID')
  // const FARI_API = 'https://www.fariapi.com/api';
  const FARI_API = 'https://fari-prod.herokuapp.com/api';
  const myToken = localStorage.getItem("fariToken");	
try {
      const response = await fetch(
        `${FARI_API}/users/my-meeting-request/${channelid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
	    Authorization: `Bearer ${myToken}`,
          },
        }
      );
      const data = await response.json();
	setRequestedMeetings(data.meetings)
	return data.meetings
    } catch (error) {
     console.log(error)
    }	  
  }	

async function getRequestorInfo(){
const FARI_API = 'https://fari-prod.herokuapp.com/api';
const myToken = localStorage.getItem("fariToken");	
let id = localStorage.getItem('requestorID');
	try {
    const response = await fetch(`${FARI_API}/users/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
    });
    const data = await response.json();
    localStorage.setItem('requestorEmail', data.user.email);
    return data.user;
  } catch (error) {
    console.log(error)
  }
}	

  async function approvalEmail(){
  const FARI_API = 'https://fari-prod.herokuapp.com/api';
	  
  let email = localStorage.getItem('requestorEmail');
  let meetingid = localStorage.getItem('meetingID');	  
  try {
    const response = await fetch(`${FARI_API}/mailer/new-meeting/${email}/${meetingid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  }catch (error) {
    console.error(error)
  }
}	

  async function cancellationEmail(){
  const FARI_API = 'https://fari-prod.herokuapp.com/api';	  
  let email = localStorage.getItem('requestorEmail');
  let meetingid = localStorage.getItem('meetingID');	  
  try {
    const response = await fetch(`${FARI_API}/mailer/cancelled-meeting/${email}/${meetingid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  }catch (error) {
    console.error(error)
  }
}	

async function approveRequest(meetingid){
  let id = meetingid;
  const FARI_API = 'https://fari-prod.herokuapp.com/api';
  const myToken = localStorage.getItem("fariToken");	
try {
      const response = await fetch(
        `${FARI_API}/users/approve-meeting/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
	    Authorization: `Bearer ${myToken}`,
          },
        }
      );
      const data = await response.json();
	getMeetings();
	getMeetingRequest();
        getRequestorInfo().then(approvalEmail);	
	return data.meeting
    } catch (error) {
     console.log(error)
    }	  
  }	

async function cancelMeeting(meetingid){

  let id = localStorage.getItem('meetingID');
 const FARI_API = 'https://fari-prod.herokuapp.com/api';
  const myToken = localStorage.getItem("fariToken");	
try {
      const response = await fetch(
        `${FARI_API}/users/delete-meeting/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
	    Authorization: `Bearer ${myToken}`,
          },
        }
      );
      const data = await response.json();
	getMeetings();
	return data.meeting
    } catch (error) {
     console.log(error)
    }	  
  }

const cancelSession = () => {
	getRequestorInfo().then(cancellationEmail).then(cancelMeeting)
}

  
  useEffect(() => {
    getMeetings();
    getMeetingRequest();
  }, []);



  
  return (
    <div>
      <h2 className="text-base font-semibold leading-6 text-gray-900 dark:text-[#fdfbf9]">Upcoming meetings</h2>
      	    
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
        <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
          <div className="flex items-center text-gray-900">
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              onClick={previousMonth}
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="flex-auto text-sm font-semibold dark:text-[#fdfbf9]">
              {format(firstDayCurrentMonth, 'MMMM yyyy' )}
            </div>
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              onClick={nextMonth}
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500 dark:text-[#fdfbf9]">
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
            
          </div>
          <div className="isolate mt-2 grid grid-cols-7 rounded-lg pb-[.5rem] text-sm shadow dark:text-[#fdfbf9]">
            {days.map((day, dayIdx) => (
      <>
      
      
             <div className="flex flex-col">
              <button
                onClick={() => setSelectedDay(day)}
                key={day.toString()}
                type="button"
                className={classNames(
                  'py-1.5 hover:bg-gray-100 focus:z-10',
                  isSameMonth(day, firstDayCurrentMonth) ? 'bg-white dark:bg-[transparent]' : 'bg-gray-50 dark:bg-[transparent]',
                  (isEqual(day, selectedDay) || isToday(day)) && 'font-semibold',
                  isEqual(day, selectedDay) && 'text-white',
                  !isEqual(day, selectedDay) && isSameMonth(day, firstDayCurrentMonth) && !isToday(day) && 'text-gray-900 dark:text-[#fdfbf9]',
                  !isEqual(day, selectedDay) && !isSameMonth(day, firstDayCurrentMonth) && !isToday(day) && 'text-gray-400',
                  isToday(day) && !isEqual(day, selectedDay) && 'text-red-500',
                  dayIdx === 0 && 'rounded-tl-lg',
                  dayIdx === 6 && 'rounded-tr-lg',
                  dayIdx === days.length - 7 && 'rounded-bl-lg',
                  dayIdx === days.length - 1 && 'rounded-br-lg',
                  dayIdx === 0 && startClasses[getDay(day)],
                )}
              >
                <time
                  dateTime={format(day, 'yyyy-MM-dd')}
                  className={classNames(
                    'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                    isEqual(day, selectedDay) && isToday(day) && 'bg-[#050529] dark:bg-blue-950',
                    isEqual(day, selectedDay) && !isToday(day) && 'bg-gray-900'
                  )}
                >
                  {format(day, 'd')}
                </time>
              </button>
              <div className="w-1 h-1 mt-1 mx-auto">
              {meetings.some((meeting) => isSameDay(parseISO(meeting.date_time), day)
            ) && (
            <div className="w-1 h-1 bg-[red] rounded-full bg-sky-600"></div>
            )}
              </div>

           </div>
                </>
            ))}


          </div>
          <ScheduleModal meetings={meetings} setMeetings={setMeetings}>
                    <Button
		     accent
                     className="mt-8 w-full h-[2.5rem] text-[1.3rem] rounded-md px-3 py-2 text-sm font-semibold text-white shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Add event
          </Button>
          </ScheduleModal>

        </div>
        <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
          {selectedDayMeetings.length > 0 ? (
            selectedDayMeetings.map((meeting) => (
              <li key={meeting.meetingid} className="relative flex space-x-6 py-6 xl:static" onClick={(e) => setRequestor(e, meeting.requestorid, meeting.meetingid)}>
              <img src={meeting.profile_avatar + '?format=webp'} alt="" className="h-14 w-14 flex-none rounded-full" />
              <div className="flex-auto">
                <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0 dark:text-[#fdfbf9]">{meeting.name}</h3>
                <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row dark:text-[#fdfbf9]">
                  <div className="flex items-start space-x-3">
                    <dt className="mt-0.5">
                      <span className="sr-only">Date</span>
                      <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </dt>
                    <dd>
                      <time dateTime={meeting.date_time}>
                        {format(parseISO(meeting.date_time), 'MMMM d, yyyy')} at {format(parseISO(meeting.date_time), 'h:mm a')}
                      </time>
                    </dd>
                  </div>
                  <div className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5 dark:text-[#fdfbf9]">
                    <dt className="mt-0.5">
                      <span className="sr-only">Location</span>
                      <MapPinIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </dt>
                    <dd>Virtual Meeting</dd>
                  </div>
                </dl>
              </div>
              <Menu as="div" className="absolute right-0 top-6 xl:relative xl:right-auto xl:top-auto xl:self-center">
                <div>
                  <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600 dark:text-[#fdfbf9]">
                    <span className="sr-only">Open options</span>
                    <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
			    onClick={() => cancelSession()}
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900 dark:text-[#fdfbf9]' : 'text-gray-700 dark:text-[#fdfbf9]',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Cancel
                          </a>
                        )}
                      </Menu.Item>
{/*                       <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900 dark:text-[#fdfbf9]' : 'text-gray-700 dark:text-[#fdfbf9]',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Cancel
                          </a>
                        )}
                      </Menu.Item> */}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </li>
            ))
   
          ) : (
      <Typography variant='h5' className="text-gray-400">No meetings today.</Typography>
              
              
              )}

        </ol>
	  
	
	  <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
		  <h2 className="text-base font-semibold leading-6 text-gray-900 dark:text-[#fdfbf9]">Requested meetings</h2>    
          {requestedDayMeetings.length > 0 ? (
            requestedDayMeetings.map((meeting) => (
              <li key={meeting.meetingid} className="relative flex space-x-6 py-6 xl:static" onClick={(e) => setRequestor(e, meeting.requestorid, meeting.meetingid)}>
              <img src={meeting.profile_avatar} alt="" className="h-14 w-14 flex-none rounded-full" />
              <div className="flex-auto">
                <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0 dark:text-[#fdfbf9]">{meeting.name}</h3>
                <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row dark:text-[#fdfbf9]">
                  <div className="flex items-start space-x-3">
                    <dt className="mt-0.5">
                      <span className="sr-only">Date</span>
                      <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </dt>
                    <dd>
                      <time dateTime={meeting.date_time}>
                        {format(parseISO(meeting.date_time), 'MMMM d, yyyy')} at {format(parseISO(meeting.date_time), 'h:mm a')}
                      </time>
                    </dd>
                  </div>
                  <div className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5 dark:text-[#fdfbf9]">
                    <dt className="mt-0.5">
                      <span className="sr-only">Location</span>
                      <MapPinIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </dt>
                    <dd>Virtual Meeting</dd>
                  </div>
                </dl>
              </div>
              <Menu as="div" className="absolute right-0 top-6 xl:relative xl:right-auto xl:top-auto xl:self-center">
                <div>
                  <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600 dark:text-[#fdfbf9]">
                    <span className="sr-only">Open options</span>
                    <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
			    onClick={() => approveRequest(meeting.meetingid)}
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900 dark:text-[#fdfbf9]' : 'text-gray-700 dark:text-[#fdfbf9]',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Approve
                          </a>
                        )}
                      </Menu.Item>
{/*                       <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900 dark:text-[#fdfbf9]' : 'text-gray-700 dark:text-[#fdfbf9]',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Cancel
                          </a>
                        )}
                      </Menu.Item> */}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </li>
            ))
   
          ) : (
      <Typography variant='h5' className="text-gray-400">No requested meetings today.</Typography>
              
              
              )}

        </ol> 	      
      </div>
    </div>
  )
}
let startClasses = [
  '', 
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7'
]

