import { BetActionTypes } from "./bet.types"



export const fetchAccordionHashStart = () => ({
    type: BetActionTypes.FETCH_ACCORDION_HASH_START
})
export const fetchCountryStart = () => ({
    type: BetActionTypes.FETCH_COUNTRY_START
})
export const fetchClubStart = () => ({
    type: BetActionTypes.FETCH_CLUB_START
})
export const fetchContinentStart = () => ({
    type: BetActionTypes.FETCH_CONTINENT_START
})
export const fetchLeagueStart = (leagueID) => ({
    type: BetActionTypes.FETCH_LEAGUE_START,
    payload: leagueID
})
export const topNavTriggered = (bool) => ({
    type: BetActionTypes.TOP_NAV_TRIGERRED_START,
    payload: bool
})
export const fetchTimeRangeStart = (index) => ({
    type: BetActionTypes.FETCH_TIMING_RANGE_START,
    payload: index
})
export const fetchFixtureStart = () => ({
    type: BetActionTypes.FETCH_FIXTURE_START
})
export const fetchFixtureOddsStart = () => ({
    type: BetActionTypes.FETCH_FIXTURE_ODDS_START
})
export const fetchLeagueNamesStart = () => ({
    type: BetActionTypes.FETCH_LEAGUE_NAMES_START
})
export const fetchUpcomingGamesStart = (str) => ({
    type: BetActionTypes.FETCH_UPCOMING_GAMES_START,
    payload: str
})
export const removeLeagueStart = (id) => ({
    type: BetActionTypes.REMOVE_LEAGUE_START,
    payload: id
})
export const betFrameHidden = (bool) => ({
    type: BetActionTypes.BET_FRAME_HIDDEN,
    payload: bool
})
export const postBetStart = (data) => ({
    type: BetActionTypes.POST_BET_START,
    payload: data
})
export const postBetSuccess = (data) => ({
    type: BetActionTypes.POST_BET_SUCCESS,
    payload: data
})
export const postBetFailure = (err) => ({
    type: BetActionTypes.POST_BET_FAILURE,
    payload: err
})
export const fetchMyBetStart = () => ({
    type: BetActionTypes.FETCH_MY_BET_START,
})
export const fetchMyBetSuccess = (data) => ({
    type: BetActionTypes.FETCH_MY_BET_SUCCESS,
    payload: data
})
export const fetchMyBetFailure = (err) => ({
    type: BetActionTypes.FETCH_MY_BET_FAILURE,
    payload: err
})



export const getBookedCodeStart = (obj) => ({
    type: BetActionTypes.FETCH_BOOKED_CODE_START,
    payload: obj
  })
  export const getBookedCodeSuccess = (data) => ({
    type: BetActionTypes.FETCH_BOOKED_CODE_SUCCESS,
    payload: data
  })
  export const getBookedCodeFailure = (err) => ({
    type: BetActionTypes.FETCH_BOOKED_CODE_FAILURE,
    payload: err
  })
export const getCouponIDStart = (id) => ({
    type: BetActionTypes.FETCH_COUPON_ID_START,
    payload: id
})
export const getCouponIDSuccess = (data) => ({
    type: BetActionTypes.FETCH_COUPON_ID_SUCCESS,
    payload: data
})
export const getCouponIDFailure = (err) => ({
    type: BetActionTypes.FETCH_COUPON_ID_FAILURE,
    payload: err
})

export const fetchAccordionHashSuccess = stri => ({
    type: BetActionTypes.FETCH_ACCORDION_HASH_SUCCESS,
    payload: stri
})
export const fetchCountrySuccess = () => ({
    type: BetActionTypes.FETCH_COUNTRY_SUCCESS
})
export const fetchClubSuccess = () => ({
    type: BetActionTypes.FETCH_CLUB_SUCCESS
})
export const fetchContinentSuccess = () => ({
    type: BetActionTypes.FETCH_CONTINENT_SUCCESS
})
export const fetchLeagueSuccess = () => ({
    type: BetActionTypes.FETCH_LEAGUE_SUCCESS
})
export const fetchFixtureSuccess = () => ({
    type: BetActionTypes.FETCH_FIXTURE_SUCCESS
})
export const fetchFixtureOddsSuccess = () => ({
    type: BetActionTypes.FETCH_FIXTURE_ODDS_SUCCESS
})
export const fetchLeagueNamesSuccess = () => ({
    type: BetActionTypes.FETCH_LEAGUE_NAMES_SUCCESS
})


