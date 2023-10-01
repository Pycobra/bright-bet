import { createContext } from "react";


export const LiveBettingDummyPlaceHolder = createContext([
    {'liveBetLeagueIdEng1':{name: 'Premiership', id: 'league1a', items: [
        {'': [
            {awayTeamID:"liveBetClubENG1a", dateAndTime: "Sat, Dec 31, 2022 12:54 PM", 
            fixtureID: "liveBetFixtureENG1a", homeTeamID: "LiveBetClubENG2a",
            HomeTeam: {name:'Z-Everton'}, AwayTeam: {name:'Z-Everton'}, time:"66'", 
            leagueName:'Z-Premiership', scoresForHome:'1', scoresForAway:'1'},
            {awayTeamID:"liveBetClubENG3a", dateAndTime: "Sat, Dec 31, 2022 12:54 PM", 
            fixtureID: "liveBetFixtureENG2a", homeTeamID: "LiveBetClubENG4a",
            HomeTeam: {name:'Z-Newcastle'}, AwayTeam: {name:'Z-Arsenal'}, time:"90 + 5'",
            leagueName:'Z-Premiership', scoresForHome:'2', scoresForAway:'0'},
            {awayTeamID:"liveBetClubENG5a", dateAndTime: "Sat, Dec 31, 2022 12:54 PM", 
            fixtureID: "liveBetFixtureENG3a", homeTeamID: "LiveBetClubENG6a",
            HomeTeam: {name:'Z-Bolton'}, AwayTeam: {name:'Z-Aston Villa'}, time:"12'", 
            leagueName:'Z-Premiership', scoresForHome:'1', scoresForAway:'3'}
        ]},
        // {'Sun Jan 01': [
        //     {awayTeamID:"liveBetClubENG3a", dateAndTime: "Sat, Dec 31, 2022 12:54 PM", 
        //     fixtureID: "liveBetFixtureENG2a", homeTeamID: "LiveBetClubENG4a",
        //     HomeTeam: {name:'Z-Newcastle'}, AwayTeam: {name:'Z-Arsenal'}, time:"90 + 5'",
        //     leagueName:'Premiership', scoresForHome:'2', scoresForAway:'0'}
        // ]},
        // {'Mon Jan 02': [
        //     {awayTeamID:"liveBetClubENG5a", dateAndTime: "Sat, Dec 31, 2022 12:54 PM", 
        //     fixtureID: "liveBetFixtureENG3a", homeTeamID: "LiveBetClubENG6a",
        //     HomeTeam: {name:'Z-Bolton'}, AwayTeam: {name:'Z-Aston Villa'}, time:"12'", 
        //     leagueName:'Premiership', scoresForHome:'1', scoresForAway:'3'}
        // ]}
    ]}},
])

export const LiveBettingDummyOdds = createContext([
    {'1/2': {'1':{},'X':{},'2':{}}},
    {'Double Chance': {'1X':{},'12':{},'X2':{}}}
]);

// export const LiveBettingDummyOdds = createContext([
//     {'1':{},'X':{},'2':{}},
//     {'1X':{},'12':{},'X2':{}}
// ]);