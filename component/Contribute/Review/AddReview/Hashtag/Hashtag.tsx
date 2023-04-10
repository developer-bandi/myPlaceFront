import React from "react";
import { HashtagAllState } from "../../../../../store/reducers/hashtagAll/Reducer";
import storeReview from "../../../../../styles/storeReview.module.scss";

interface HashtagProps {
  category: string;
  taglist: HashtagAllState;
  selectedHashtag: string[];
  changeHashtag: (hashtag: string, id: number) => void;
}

const Hashtag = ({
  category,
  taglist,
  selectedHashtag,
  changeHashtag,
}: HashtagProps) => {
  return (
    <div className={storeReview.taglistBoxBlock}>
      <h3 className={storeReview.taglistTitle}>태그를 선택해 보세요</h3>
      <div className={storeReview.tagListBlock}>
        {taglist.content !== undefined
          ? Object.keys(taglist.content[category]).map((tagTitle) => {
              return (
                <React.Fragment key={tagTitle}>
                  <h4 className={storeReview.tagTitle}>{tagTitle}</h4>
                  <ul className={storeReview.taglistBlock}>
                    {taglist.content !== undefined
                      ? taglist.content[category][tagTitle].map((tag) => {
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
                              key={tag[0]}
                            >
                              #{tag[0]}
                            </li>
                          );
                        })
                      : null}
                  </ul>
                </React.Fragment>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Hashtag;
