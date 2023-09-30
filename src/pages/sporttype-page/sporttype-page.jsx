import React, { useState } from 'react';
import "./sporttype-page.css"
import LeagueCard from '../../components/league-card/league-card.components';








const SporttypePage = ({gamesAvailableForDisplay}) => {
    console.log(gamesAvailableForDisplay, "gamesAvailableForDisplay===B")
    return (
        <div className='sporttype-page'>
            <div className="sporttype-page__wrap">
                {
                    gamesAvailableForDisplay.map((data, idx) => 
                        <LeagueCard key={idx} objID={idx} data={data} CardType='MainContentCard' />
                    )
                }
            </div>
        </div>
    )
 };
 
export default SporttypePage;






 
