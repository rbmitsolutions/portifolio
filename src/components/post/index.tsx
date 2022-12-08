import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  FaHeart,
  FaRegComment,
  FaRegHeart,
  FaRegPaperPlane,
} from "react-icons/fa";

//components
import { Button } from "../button";
import { UserPhoto } from "../userPhoto";

//styles
import styled, { css } from "styled-components";

interface IContent {
  id: number;
  url: string;
}
interface IUser {
  id: number;
  name: string;
  user: string;
  photo: string;
}

interface IData {
  id: number;
  date: Date;
  description: string;
  content: IContent[];
  likes: number;
  comments?: string[];
  user: IUser;
}

interface IPost {
  data: IData;
}

export function Post({ data }: IPost) {
  const AMOUNT_OF_IMAGES = data?.content.length;
  const NUMBERS_OF_CONTENT_TO_SHOW = 1;
  const COTENT_WIDTH_REF: any = useRef(null);
  const COTENT_IMAGES_REF: any = useRef(null);
  const [scrolledTimes, setScrolledTimes] = useState(0);
  const [liked, setLiked] = useState<boolean>(false);

  function fillHeart() {
    const heart = document.getElementById("heart-svg");
    const heartFilled = document.getElementById("heart-svg-filled");
    if (liked) {
      heart?.classList.remove("liked-animation");
      heartFilled?.classList.remove("liked-animation-filled");
      setLiked(false);
    } else {
      heart?.classList.add("liked-animation");
      heartFilled?.classList.add("liked-animation-filled");
      setLiked(true);
    }
  }

  const handleScrollImage = (isNext: boolean) => {
    const amountToScroll = isNext ? 1 : -1;
    let newValue = amountToScroll + scrolledTimes;

    // Verify if it can still scroll
    // "NUMBERS_OF_CONTENT_TO_SHOW" is the number of dates that we show to user

    if (newValue > AMOUNT_OF_IMAGES - NUMBERS_OF_CONTENT_TO_SHOW) {
      newValue = AMOUNT_OF_IMAGES - NUMBERS_OF_CONTENT_TO_SHOW;
    }

    if (newValue < 0) {
      newValue = 0;
    }

    const windowContent = COTENT_WIDTH_REF?.current?.clientHeight;

    const element = document.getElementById(`post-images-${data?.id}`);

    element?.scrollTo({
      left: windowContent * newValue,
      behavior: "smooth",
    });
    setScrolledTimes(newValue);
  };

  return (
    <Container>
      <div className='post-header'>
        <UserPhoto
          size='small'
          url={data?.user?.photo}
          label={data?.user?.name}
          smallLabel={data?.user?.user}
        />
      </div>
      <div className='post-content' id='post-content'>
        {data?.content.length > 1 && scrolledTimes > 0 && (
          <div
            className='left-container'
            onClick={() => handleScrollImage(false)}
          />
        )}

        {data?.content.length > 1 &&
          scrolledTimes < data?.content.length - 1 && (
            <div
              className='right-container'
              onClick={() => handleScrollImage(true)}
            />
          )}

        <div
          className='post-images'
          id={`post-images-${data?.id}`}
          ref={COTENT_IMAGES_REF}
        >
          {data?.content?.map((img) => {
            return (
              <img
                key={img?.id}
                src={img?.url}
                ref={COTENT_WIDTH_REF}
                id='post-image-content'
              />
            );
          })}
        </div>
      </div>
      <div className='post-footer'>
        <div className='icons'>
          <div className='heart-container' onClick={() => fillHeart()}>
            <Button
              className='heart'
              shape='icon'
              size='small'
              icon={<FaRegHeart id='heart-svg' className='' />}
            />

            <Button
              className='heart'
              shape='icon'
              size='small'
              icon={<FaHeart id='heart-svg-filled' className='' />}
            />
          </div>
          {data?.content.length > 1 && (
            <SliceContainer>
              {data?.content?.map((x, index) => {
                return (
                  <SliceItem key={x.id} selected={index === scrolledTimes} />
                );
              })}
            </SliceContainer>
          )}
          <Button shape='icon' size='small' icon={<FaRegComment />} />
          <Button shape='icon' size='small' icon={<FaRegPaperPlane />} />
        </div>
        <div className='likes-coments'>
          <strong className='likes'>{data?.likes} likes</strong>
          <strong>
            <Link href='/'>{data?.user?.name}</Link>
            {data?.description && <small>{data?.description}</small>}
          </strong>
          <small className='views-date comments'>
            View all {data?.comments?.length} comments
          </small>
          <small className='views-date'>
            {data?.date.toLocaleDateString("en-GB")}
          </small>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 470px;
  margin: 0 auto;
  border-radius: 0.5rem;
  .post-header {
    display: inline-block;
    padding: 1rem;
  }

  .post-content {
    position: relative;
    max-height: 500px;
    max-width: 470px;

    .left-container,
    .right-container {
      position: absolute;
      content: ' ',
      cursor: pointer;
      height: 100%;
      width: 30%;
      z-index: 3;
      cursor: pointer;
      @media (max-width:450px) {
        display: none;
      }
    }
    .left-container {
      left: 0;
    }
    .right-container {
      right: 0;
    }

    .post-images {
      display: flex;
      position: relative;
      overflow-x: scroll;
      scroll-snap-type: x mandatory ;
 
      ::-webkit-scrollbar {
        height: 5px;
      }
      
      @media (min-width: 850px) {
    
        ::-webkit-scrollbar {
          display: none;
          cursor: pointer;
        }
      }
      #post-image-content {
        width: 100%;
        height: auto;
        scroll-snap-align: start;
      }
    }
  }

  .post-footer {
    padding: 1rem;
    .icons {
      display: flex;
      position: relative;
      gap: 0.5rem;
      svg {
        position: absolute;
        font-size: 1.2rem;
      }
      .heart-container {
        position: relative;
        width: 30px;
        .heart {
          position: absolute;
          padding: 0;
          svg {
            position: absolute;
            font-size: 1.2rem;
          }
          #heart-svg {
            opacity: 1;
          }
          #heart-svg-filled {
            opacity: 0;
            color: #af2634;
          }
        }
      }
    }
    .likes-coments {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-top: 0.5rem;
      strong {
        font-weight: bold;
        cursor: pointer;
        a {
          decoration: none;
        }
        small {
          margin-left: 0.5rem;
        }
      }
      .views-date {
        font-weight: 300;
      }
      .comments {
        cursor: pointer;
      }
    }
  }

  .liked-animation {
    animation: liked 0.6s ease-in-out;
  }
  .liked-animation-filled {
    animation: liked-filled 0.6s ease-in-out;
  }

  ${({ theme }) => css`
    background: ${theme.colors.primary_100};
    border: 1px solid ${theme.colors.primary_75};
    .post-footer {
      .icons {
        svg {
          color: ${theme.colors.text_75};
        }
      }
      .likes-coments {
        strong {
          color: ${theme.colors.text_100};
          a,
          small {
            color: ${theme.colors.text_100};
          }
        }
        .views-date {
          color: ${theme.colors.text_75};
        }
      }
    }
  `}

  @media (max-width:850px) { 
    .post-images{
      padding-bottom: 0.3rem;
      margin: 0 1rem;
      ::-webkit-scrollbar-thumb {
        padding: 1rem;
        border-radius: 0.5rem;

    ${({ theme }) => css`
      background: ${theme.colors.logo_100};
    `}
  }
    }
    .left-container,
    .right-container {
     display: none;
    }

   
  }


  @keyframes liked {
    0% {
      font-size: 1.2rem;
    }
    50% {
      font-size: 1.9rem;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes liked-filled {
    0% {
      opacity: 0;
      font-size: 1.2rem;
    }

    25% {
      font-size: 2.5rem;
    }
    50% {
      font-size: 1.2rem;
    }

    100% {
      opacity: 1;
      font-size: 1.7rem;
    }
  }
`;

const SliceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  gap: 0.3rem;
  padding: 0.5rem;

  height: 20px;
  z-index: 1;
  border-radius: 20px;

  ${({ theme }) => css`
    background: ${theme.colors.primary_75};
  `}

  @media (max-width: 850px) {
    display: none;
  }
`;

interface ISliceItem {
  selected: boolean;
}

const SliceItem = styled.div<ISliceItem>`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  transition: all 0.5s ease-in-out;
  ${({ theme, selected }) => css`
    background: ${selected
      ? theme.colors.logo_100
      : "rgba(255, 255, 255, 0.616)"};
  `}
`;

// import React, { useRef, useState } from "react";
// import Link from "next/link";
// import {
//   FaHeart,
//   FaRegComment,
//   FaRegHeart,
//   FaRegPaperPlane,
// } from "react-icons/fa";

// //components
// import { Button } from "../button";
// import { UserPhoto } from "../userPhoto";

// //styles
// import styled, { css } from "styled-components";

// interface IContent {
//   id: number;
//   url: string;
// }
// interface IUser {
//   id: number;
//   name: string;
//   user: string;
//   photo: string;
// }

// interface IData {
//   id: number;
//   date: Date;
//   description: string;
//   content: IContent[];
//   likes: number;
//   comments?: string[];
//   user: IUser;
// }

// interface IPost {
//   data: IData;
// }

// export function Post({ data }: IPost) {
//   const NUMBERS_OF_CONTENT_TO_SHOW = 1;
//   const COTENT_WIDTH_REF: any = useRef(null);
//   const [scrolledTimes, setScrolledTimes] = useState(0);
//   const [left, setLeft] = useState<number>(0);
//   const [liked, setLiked] = useState<boolean>(false);

//   function fillHeart() {
//     const heart = document.getElementById("heart-svg");
//     const heartFilled = document.getElementById("heart-svg-filled");
//     if (liked) {
//       heart?.classList.remove("liked-animation");
//       heartFilled?.classList.remove("liked-animation-filled");
//       setLiked(false);
//     } else {
//       heart?.classList.add("liked-animation");
//       heartFilled?.classList.add("liked-animation-filled");
//       setLiked(true);
//     }
//   }

//   const handleScrollImage = (isNext: boolean) => {
//     const windowContent = COTENT_WIDTH_REF?.current?.clientHeight;
//     const max = data?.content.length * windowContent;
//     if (isNext && max - windowContent > Math.abs(left)) {
//       setScrolledTimes(scrolledTimes + 1);
//       setLeft(left - windowContent);
//     } else if (!isNext && Math.abs(left) > 0) {
//       setLeft(left + windowContent);
//       setScrolledTimes(scrolledTimes - 1);
//     }
//   };

//   return (
//     <Container>
//       <div className='post-header'>
//         <UserPhoto
//           size='small'
//           url={data?.user?.photo}
//           label={data?.user?.name}
//           smallLabel={data?.user?.user}
//         />
//       </div>
//       <div className='post-content' id='post-content'>
//         {data?.content.length > 1 && scrolledTimes > 0 && (
//           <div
//             className='left-container'
//             onClick={() => handleScrollImage(false)}
//           />
//         )}

//         {data?.content.length > 1 &&
//           scrolledTimes < data?.content.length - 1 && (
//             <div
//               className='right-container'
//               onClick={() => handleScrollImage(true)}
//             />
//           )}

//         <div
//           className='post-images'
//           id={`post-images-${data?.id}`}
//           style={{ left: left }}
//         >
//           {data?.content?.map((img) => {
//             return (
//               <img
//                 key={img?.id}
//                 src={img?.url}
//                 ref={COTENT_WIDTH_REF}
//                 id='post-image-content'
//               />
//             );
//           })}
//         </div>
//       </div>
//       <div className='post-footer'>
//         <div className='icons'>
//           <div className='heart-container' onClick={() => fillHeart()}>
//             <Button
//               className='heart'
//               shape='icon'
//               size='small'
//               icon={<FaRegHeart id='heart-svg' className='' />}
//             />

//             <Button
//               className='heart'
//               shape='icon'
//               size='small'
//               icon={<FaHeart id='heart-svg-filled' className='' />}
//             />
//           </div>
//           {data?.content.length > 1 && (
//             <SliceContainer>
//               {data?.content?.map((x, index) => {
//                 return (
//                   <SliceItem key={x.id} selected={index === scrolledTimes} />
//                 );
//               })}
//             </SliceContainer>
//           )}
//           <Button shape='icon' size='small' icon={<FaRegComment />} />
//           <Button shape='icon' size='small' icon={<FaRegPaperPlane />} />
//         </div>
//         <div className='likes-coments'>
//           <strong className='likes'>{data?.likes} likes</strong>
//           <strong>
//             <Link href='/'>{data?.user?.name}</Link>
//             {data?.description && <small>{data?.description}</small>}
//           </strong>
//           <small className='views-date comments'>
//             View all {data?.comments?.length} comments
//           </small>
//           <small className='views-date'>
//             {data?.date.toLocaleDateString("en-GB")}
//           </small>
//         </div>
//       </div>
//     </Container>
//   );
// }

// const Container = styled.div`
//   width: 100%;
//   max-width: 470px;
//   margin: 0 auto;
//   border-radius: 0.5rem;
//   .post-header {
//     display: inline-block;
//     padding: 1rem;
//   }

//   .post-content {
//     position: relative;
//     max-height: 500px;
//     max-width: 470px;

//     .left-container,
//     .right-container {
//       position: absolute;
//       content: ' ',
//       cursor: pointer;
//       height: 100%;
//       width: 30%;
//       z-index: 1;
//       cursor: pointer;
//     }
//     .left-container {
//       left: 0;
//     }
//     .right-container {
//       right: 0;
//     }

//     overflow: hidden;
//     .post-images {
//       display: flex;
//       position: relative;
//       left: -300px;
//       overflow-x: scroll;
//        scroll-snap-type: x mandatory !important;
//       transition: all 0.5s ease-in-out;
//       ::-webkit-scrollbar {
//         /* display: none; */
//         background: orange;
//       }
//       ::-webkit-scrollbar-thumb {
//         background: blue;
//       }
//       #post-image-content {
//         width: 100%;
//         height: auto;
//         scroll-snap-align: start;
//       }
//     }
//   }

//   .post-footer {
//     padding: 1rem;
//     .icons {
//       display: flex;
//       position: relative;
//       gap: 0.5rem;
//       svg {
//         position: absolute;
//         font-size: 1.2rem;
//       }
//       .heart-container {
//         position: relative;
//         width: 30px;
//         .heart {
//           position: absolute;
//           padding: 0;
//           svg {
//             position: absolute;
//             font-size: 1.2rem;
//           }
//           #heart-svg {
//             opacity: 1;
//           }
//           #heart-svg-filled {
//             opacity: 0;
//             color: #af2634;
//           }
//         }
//       }
//     }
//     .likes-coments {
//       display: flex;
//       flex-direction: column;
//       gap: 0.5rem;
//       margin-top: 0.5rem;
//       strong {
//         font-weight: bold;
//         cursor: pointer;
//         a {
//           decoration: none;
//         }
//         small {
//           margin-left: 0.5rem;
//         }
//       }
//       .views-date {
//         font-weight: 300;
//       }
//       .comments {
//         cursor: pointer;
//       }
//     }
//   }

//   .liked-animation {
//     animation: liked 0.6s ease-in-out;
//   }
//   .liked-animation-filled {
//     animation: liked-filled 0.6s ease-in-out;
//   }

//   ${({ theme }) => css`
//     background: ${theme.colors.primary_100};
//     border: 1px solid ${theme.colors.primary_75};
//     .post-content {
//       background-color: ${theme.colors.primary_0};
//     }
//     .post-footer {
//       .icons {
//         svg {
//           color: ${theme.colors.text_75};
//         }
//       }
//       .likes-coments {
//         strong {
//           color: ${theme.colors.text_100};
//           a,
//           small {
//             color: ${theme.colors.text_100};
//           }
//         }
//         .views-date {
//           color: ${theme.colors.text_75};
//         }
//       }
//     }
//   `}

//   @keyframes liked {
//     0% {
//       font-size: 1.2rem;
//     }
//     50% {
//       font-size: 1.9rem;
//     }
//     100% {
//       opacity: 0;
//     }
//   }
//   @keyframes liked-filled {
//     0% {
//       opacity: 0;
//       font-size: 1.2rem;
//     }

//     25% {
//       font-size: 2.5rem;
//     }
//     50% {
//       font-size: 1.2rem;
//     }

//     100% {
//       opacity: 1;
//       font-size: 1.7rem;
//     }
//   }
// `;

// const SliceContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   position: absolute;
//   right: 0;
//   gap: 0.3rem;
//   padding: 0.5rem;
//   /* width: 70px; */
//   height: 20px;
//   z-index: 1;
//   border-radius: 20px;

//   ${({ theme }) => css`
//     background: ${theme.colors.primary_75};
//   `}
// `;

// interface ISliceItem {
//   selected: boolean;
// }

// const SliceItem = styled.div<ISliceItem>`
//   width: 10px;
//   height: 10px;
//   border-radius: 10px;
//   transition: all 0.5s ease-in-out;
//   ${({ theme, selected }) => css`
//     background: ${selected
//       ? theme.colors.logo_100
//       : "rgba(255, 255, 255, 0.616)"};
//   `}
// `;

// import React, { useRef, useState } from "react";
// import Link from "next/link";
// import {
//   FaHeart,
//   FaRegComment,
//   FaRegHeart,
//   FaRegPaperPlane,
// } from "react-icons/fa";

// //components
// import { Button } from "../button";
// import { UserPhoto } from "../userPhoto";

// //styles
// import styled, { css } from "styled-components";

// interface IContent {
//   id: number;
//   url: string;
// }
// interface IUser {
//   id: number;
//   name: string;
//   user: string;
//   photo: string;
// }

// interface IData {
//   id: number;
//   date: Date;
//   description: string;
//   content: IContent[];
//   likes: number;
//   comments?: string[];
//   user: IUser;
// }

// interface IPost {
//   data: IData;
// }

// export function Post({ data }: IPost) {
//   const AMOUNT_OF_IMAGES = data?.content.length;
//   const NUMBERS_OF_CONTENT_TO_SHOW = 1;
//   const COTENT_WIDTH_REF: any = useRef(null);
//   const [scrolledTimes, setScrolledTimes] = useState(0);
//   const [liked, setLiked] = useState<boolean>(false);

//   function fillHeart() {
//     const heart = document.getElementById("heart-svg");
//     const heartFilled = document.getElementById("heart-svg-filled");
//     if (liked) {
//       heart?.classList.remove("liked-animation");
//       heartFilled?.classList.remove("liked-animation-filled");
//       setLiked(false);
//     } else {
//       heart?.classList.add("liked-animation");
//       heartFilled?.classList.add("liked-animation-filled");
//       setLiked(true);
//     }
//   }

//   const handleScrollImage = (isNext: boolean) => {
//     const amountToScroll = isNext ? 1 : -1;
//     let newValue = amountToScroll + scrolledTimes;

//     // Verify if it can still scroll
//     // "NUMBERS_OF_CONTENT_TO_SHOW" is the number of dates that we show to user

//     if (newValue > AMOUNT_OF_IMAGES - NUMBERS_OF_CONTENT_TO_SHOW) {
//       newValue = AMOUNT_OF_IMAGES - NUMBERS_OF_CONTENT_TO_SHOW;
//     }

//     if (newValue < 0) {
//       newValue = 0;
//     }

//     const windowContent = COTENT_WIDTH_REF?.current?.clientHeight;
//     const element = document.getElementById(`post-images-${data?.id}`);

//     element?.scrollTo({
//       left: windowContent * newValue,
//       behavior: "smooth",
//     });
//     setScrolledTimes(newValue);
//   };

//   return (
//     <Container>
//       <div className='post-header'>
//         <UserPhoto
//           size='small'
//           url={data?.user?.photo}
//           label={data?.user?.name}
//           smallLabel={data?.user?.user}
//         />
//       </div>
//       <div className='post-content' id='post-content'>
//         {data?.content.length > 1 && scrolledTimes > 0 && (
//           <div
//             className='left-container'
//             onClick={() => handleScrollImage(false)}
//           />
//         )}

//         {data?.content.length > 1 &&
//           scrolledTimes < data?.content.length - 1 && (
//             <div
//               className='right-container'
//               onClick={() => handleScrollImage(true)}
//             />
//           )}

//         <div className='post-images' id={`post-images-${data?.id}`}>
//           {data?.content?.map((img) => {
//             return (
//               <img
//                 key={img?.id}
//                 src={img?.url}
//                 ref={COTENT_WIDTH_REF}
//                 id='post-image-content'
//               />
//             );
//           })}
//         </div>
//       </div>
//       <div className='post-footer'>
//         <div className='icons'>
//           <div className='heart-container' onClick={() => fillHeart()}>
//             <Button
//               className='heart'
//               shape='icon'
//               size='small'
//               icon={<FaRegHeart id='heart-svg' className='' />}
//             />

//             <Button
//               className='heart'
//               shape='icon'
//               size='small'
//               icon={<FaHeart id='heart-svg-filled' className='' />}
//             />
//           </div>
//           {data?.content.length > 1 && (
//             <SliceContainer>
//               {data?.content?.map((x, index) => {
//                 return (
//                   <SliceItem key={x.id} selected={index === scrolledTimes} />
//                 );
//               })}
//             </SliceContainer>
//           )}
//           <Button shape='icon' size='small' icon={<FaRegComment />} />
//           <Button shape='icon' size='small' icon={<FaRegPaperPlane />} />
//         </div>
//         <div className='likes-coments'>
//           <strong className='likes'>{data?.likes} likes</strong>
//           <strong>
//             <Link href='/'>{data?.user?.name}</Link>
//             {data?.description && <small>{data?.description}</small>}
//           </strong>
//           <small className='views-date comments'>
//             View all {data?.comments?.length} comments
//           </small>
//           <small className='views-date'>
//             {data?.date.toLocaleDateString("en-GB")}
//           </small>
//         </div>
//       </div>
//     </Container>
//   );
// }

// const Container = styled.div`
//   width: 100%;
//   max-width: 470px;
//   margin: 0 auto;
//   border-radius: 0.5rem;
//   .post-header {
//     display: inline-block;
//     padding: 1rem;
//   }

//   .post-content {
//     position: relative;
//     max-height: 500px;
//     max-width: 470px;

//     .left-container,
//     .right-container {
//       position: absolute;
//       content: ' ',
//       cursor: pointer;
//       height: 100%;
//       width: 30%;
//       z-index: 3;
//       cursor: pointer;
//       @media (max-width:450px) {
//         display: none;
//       }
//     }
//     .left-container {
//       left: 0;
//     }
//     .right-container {
//       right: 0;
//     }

//     .post-images {
//       display: flex;
//       position: relative;
//       overflow-x: scroll;
//       scroll-snap-type: x mandatory !important;
//       ::-webkit-scrollbar {
//         display: none;
//       }
//       ::-webkit-scrollbar-thumb {
//         background: blue;
//       }
//       #post-image-content {
//         width: 100%;
//         height: auto;
//         scroll-snap-align: start;
//       }
//     }
//   }

//   .post-footer {
//     padding: 1rem;
//     .icons {
//       display: flex;
//       position: relative;
//       gap: 0.5rem;
//       svg {
//         position: absolute;
//         font-size: 1.2rem;
//       }
//       .heart-container {
//         position: relative;
//         width: 30px;
//         .heart {
//           position: absolute;
//           padding: 0;
//           svg {
//             position: absolute;
//             font-size: 1.2rem;
//           }
//           #heart-svg {
//             opacity: 1;
//           }
//           #heart-svg-filled {
//             opacity: 0;
//             color: #af2634;
//           }
//         }
//       }
//     }
//     .likes-coments {
//       display: flex;
//       flex-direction: column;
//       gap: 0.5rem;
//       margin-top: 0.5rem;
//       strong {
//         font-weight: bold;
//         cursor: pointer;
//         a {
//           decoration: none;
//         }
//         small {
//           margin-left: 0.5rem;
//         }
//       }
//       .views-date {
//         font-weight: 300;
//       }
//       .comments {
//         cursor: pointer;
//       }
//     }
//   }

//   .liked-animation {
//     animation: liked 0.6s ease-in-out;
//   }
//   .liked-animation-filled {
//     animation: liked-filled 0.6s ease-in-out;
//   }

//   ${({ theme }) => css`
//     background: ${theme.colors.primary_100};
//     border: 1px solid ${theme.colors.primary_75};
//     .post-content {
//       background-color: ${theme.colors.primary_0};
//     }
//     .post-footer {
//       .icons {
//         svg {
//           color: ${theme.colors.text_75};
//         }
//       }
//       .likes-coments {
//         strong {
//           color: ${theme.colors.text_100};
//           a,
//           small {
//             color: ${theme.colors.text_100};
//           }
//         }
//         .views-date {
//           color: ${theme.colors.text_75};
//         }
//       }
//     }
//   `}

//   @keyframes liked {
//     0% {
//       font-size: 1.2rem;
//     }
//     50% {
//       font-size: 1.9rem;
//     }
//     100% {
//       opacity: 0;
//     }
//   }
//   @keyframes liked-filled {
//     0% {
//       opacity: 0;
//       font-size: 1.2rem;
//     }

//     25% {
//       font-size: 2.5rem;
//     }
//     50% {
//       font-size: 1.2rem;
//     }

//     100% {
//       opacity: 1;
//       font-size: 1.7rem;
//     }
//   }
// `;

// const SliceContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   position: absolute;
//   right: 0;
//   gap: 0.3rem;
//   padding: 0.5rem;
//   /* width: 70px; */
//   height: 20px;
//   z-index: 1;
//   border-radius: 20px;

//   ${({ theme }) => css`
//     background: ${theme.colors.primary_75};
//   `}
// `;

// interface ISliceItem {
//   selected: boolean;
// }

// const SliceItem = styled.div<ISliceItem>`
//   width: 10px;
//   height: 10px;
//   border-radius: 10px;
//   transition: all 0.5s ease-in-out;
//   ${({ theme, selected }) => css`
//     background: ${selected
//       ? theme.colors.logo_100
//       : "rgba(255, 255, 255, 0.616)"};
//   `}
// `;
