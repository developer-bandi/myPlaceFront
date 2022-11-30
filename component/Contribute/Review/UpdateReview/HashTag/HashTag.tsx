import React from "react";
import storeReview from "../../../../../lib/styles/storeReview.module.scss";
import { HashtagAllState } from "../../../../../store/reducers/hashtagAll/Reducer";

interface HashTagProps {
  storeInfo:
    | {
        name: string;
        category: string;
        address: string;
      }
    | undefined;
  taglist: HashtagAllState;
  selectedHashtag: string[];
  changeHashtag: (hashtag: string, id: number) => void;
}

const HashTag = ({
  taglist,
  storeInfo,
  selectedHashtag,
  changeHashtag,
}: HashTagProps) => {
  return (
    <div className={storeReview.taglistBoxBlock}>
      <h3 className={storeReview.taglistTitle}>태그를 선택해 보세요</h3>
      <div className={storeReview.tagListBlock}>
        {taglist.content !== undefined &&
          storeInfo !== undefined &&
          Object.keys(taglist.content[storeInfo.category]).map((tagTitle) => {
            if (storeInfo !== undefined)
              return (
                <React.Fragment key={tagTitle}>
                  <h3 className={storeReview.tagTitle}>{tagTitle}</h3>
                  <ul className={storeReview.taglistBlock}>
                    {taglist.content !== undefined &&
                      taglist.content[storeInfo.category][tagTitle].map(
                        (tag, index) => {
                          return (
                            <li
                              className={
                                selectedHashtag.indexOf(tag[0]) !== -1
                                  ? storeReview.selectedHashtag
                                  : storeReview.hashtag
                              }
                              onClick={() => {
                                changeHashtag(tag[0], tag[2]);
                              }}
                              data-testid={`changeHashtag${index}`}
                              key={tag[0]}
                            >
                              #{tag[0]}
                            </li>
                          );
                        }
                      )}
                  </ul>
                </React.Fragment>
              );
          })}
      </div>
    </div>
  );
};

export default HashTag;
