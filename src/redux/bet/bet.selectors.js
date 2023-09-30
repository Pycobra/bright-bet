import { createSelector } from "reselect";
import moment from 'moment'


const selectBet = state => state.bet
export const selectAllBet = createSelector(
    [selectBet],
    (bet) => bet
)
export const selectIsFetchingBet = createSelector(
    [selectAllBet],
    (bet) => bet.isFetching
)
export const selectIsFetching2 = createSelector(
    [selectAllBet],
    (bet) => bet.isFetching2
)
export const selectIsFetching3 = createSelector(
    [selectAllBet],
    (bet) => bet.isFetching3
)
export const selectAccordion = (stri) => createSelector(
    [selectAllBet],
    (bet) => {
        return stri === "SIDENAV" || stri === "MainContent" ? bet.accordion.main
        : stri === "LIVEBETTING" ? bet.accordion.livebetting
        : stri === "UPCOMING" ? bet.accordion.upcoming
        : null
    }
)

export const selectCountries = createSelector(
    [selectAllBet],
    (bet) => bet.country_data
)
export const selectContinent = createSelector(
    [selectAllBet],
    (bet) => bet.continent_data
)
export const selectClubs = createSelector(
    [selectAllBet],
    (bet) => bet.clubs_data
)
export const selectFixtures = createSelector(
    [selectAllBet],
    (bet) => bet.fixture_data
)
export const selectLeague = createSelector(
    [selectAllBet],
    (bet) => bet.league_data
)
export const selectUpcomingGames = createSelector(
    [selectAllBet],
    (bet) => bet.upcoming_games
)
export const selectTimeRange = createSelector(
    [selectAllBet],
    (bet) => bet.time_range
)
export const selectLeagueToDisplay = createSelector(
    [selectAllBet],
    (bet) => bet.display_league
)
export const selectTopVNavTrigerred = createSelector(
    [selectAllBet],
    (bet) => bet.top_nav_triggered
)
export const accordionLeagueNamesToDisplay = createSelector(
    [selectAllBet],
    (bet) => bet.accordion_league_names_to_display
)
export const selectSingleClub = (id, homeTeam, awayTeam) => createSelector(
    [selectClubs],
    (club) => Object.keys(club).map(itm => {
       return club[itm][id]
    }).find(itm => itm)
)
export const selectLeagueNames = createSelector(
    [selectAllBet],
    (bet) => bet.leagueNames
)
export const selectFixtureOdds = createSelector(
    [selectAllBet],
    (bet) => bet.fixture_odds_data
)
export const selectBooking = createSelector(
    [selectAllBet],
    (bet) => bet.booking_data
)
export const selectBetFrameHidden = createSelector(
    [selectAllBet],
    (bet) => bet.bet_frame_hidden
)
export const selectBetActionString = createSelector(
    [selectAllBet],
    (bet) => bet.bet_action_string 
)
export const selectErrMsg = createSelector(
    [selectAllBet],
    (bet) => bet.errorMessage 
)

export const selectBookingCode = createSelector(
    [selectAllBet],
    (bet) => bet.bookingCode
)
export const selectCouponID = createSelector(
    [selectAllBet],
    (bet) => bet.couponID_data
)


//      not in use
export const selectFromCountriesAndLeague = createSelector(
    [selectCountries, selectLeague, selectFixtures],
    (countries, league, fixture) => {
        return Object.keys(countries).map(itm => {
            var list = []
            league[itm].map(obj => Object.keys(obj).map(id => {
                    obj[id]['id'] = id
                    list.push(obj[id])
                }
            ))
            countries[itm]['leagues'] = list
            return countries[itm]
        })
    }
)

export const selectHeaders = (header_level) => createSelector(
    [selectFixtureOdds],
    (head) => {
        return header_level === "level1"
        ? Object.keys(head).map((stri, idx) => {
            return {name:stri, id:idx, active:idx===0 ? true : false}
        })
        : header_level === "level2"
        ? Object.keys(head).map(obj => Object.keys(head[obj]).map((stri, idx) => {
            return {name: stri, id: idx, active:idx===0 ? true : false}
        }))
        : header_level === "level3"
        ? Object.keys(head).map(obj => Object.keys(head[obj]).map(itm => 
            Object.keys(head[obj][itm]).map((stri, idx) => ({name: stri, items: head[obj][itm][stri]})
        )))
        : null
    }
)

//   not in use
// export const selectUpcomingGamesMap = createSelector(
//     [selectFixtures, selectLeague],
//     (fixtures, leagues) => {
//         // console.log(' A A A A A A A A A A A A A A A A A A A A A A A A A')
//         // here we select all fixtures of each leagues and then group together all games 
//         // that shares the same kick off time
//         const todays_date = moment().format('llll').split(',').slice(0,2).join('')
//         const allFixturesByLeague = Object.keys(fixtures).map(obj => 
//             Object.keys(leagues).map(stri => leagues[stri].find(itm => {
//                 var groupedList  = []
//                 var newItem = false
//                 if (Object.keys(itm)[0] === obj){
//                     Object.keys(fixtures[obj]).map(fix => {
//                         const timeArray = fixtures[obj][fix]['dateAndTime'].split(',')
//                         const dateAndTime = timeArray[0] + timeArray[1]
//                         groupedList.map(item => {
//                             Object.keys(item).map(stri => {
//                                 if (stri === dateAndTime) {
//                                     newItem = false
//                                     fixtures[obj][fix]['fixtureID'] = fix
//                                     item[stri].push(fixtures[obj][fix])
//                                     return
//                                 }
//                                 else {
//                                     newItem = true
//                                     return
//                                 }
//                             })
//                         })
//                         if (groupedList.length === 0 || newItem){
//                             fixtures[obj][fix]['fixtureID'] = fix
//                             if (todays_date === dateAndTime){
//                                 groupedList.push({[dateAndTime]: [fixtures[obj][fix]]})
//                             }
//                         }
//                         itm[obj]['items'] = groupedList
//                     })
//                     return Object.keys(itm)[0] === obj
//                 }
//                 })
//             ).find(i => i)
//         ).filter(i => i)
//     // console.log(allFixturesByLeague, 'NGNGNG ))((*&^^%%$#$#')
//         return allFixturesByLeague
//     }
// )
