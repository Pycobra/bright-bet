import { COUNTRIES } from './db/db_country'
import { CONTINENTS } from './db/db_continents'
import { CLUBS } from './db/db_clubs'
import { FIXTURES_ODDS } from './db/db_fixtureOdds'
import { FIXTURES } from './db/db_fixtures'
import { LEAGUES } from './db/db_leagues'
import { AccordionHash } from './db/db_accordion-hash'
import { BetActionTypes } from './bet.types';
import { LeagueNames } from './db/db_league-names'
import { 
    SortLeague, LeaguesToDisplay, 
    UpcomingGames, RemoveLeague 
} from './bet.utils'



const INITIAL_STATE = {
    country_data: COUNTRIES,
    continent_data: CONTINENTS,
    clubs_data: CLUBS,
    fixture_data: FIXTURES,
    fixture_odds_data: FIXTURES_ODDS,
    league_data: LEAGUES,
    league_data2: LEAGUES,
    upcoming_games: [],
    display_league: [],
    leagueNames: LeagueNames,
    isFetching: false,
    isFetching2: false,
    isFetching3: false,
    accordion: [],
    time_range: [{name:'Today', active: false},
            {name:'3H', active: false}, {name:'24H', active: false},
            {name:'72H', active: false},{name:'All', active: true}],
    accordion_league_names_to_display: null,
    bet_frame_hidden: null,
    bet_action_string: '',
    booking_data: null,
    errorMessage: undefined,
    top_nav_triggered: false,
    bookingCode: null,
    couponID_data: null,
}

const betReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case BetActionTypes.FETCH_ACCORDION_HASH_START:
            return{
                ...state,
                isFetching: true,
                accordion: AccordionHash
            }
        case BetActionTypes.FETCH_COUNTRY_START:
            return{
                ...state,
                isFetching: true,
            }
        case BetActionTypes.FETCH_CLUB_START:
            return{
                isFetching: true,
                ...state,
            }
        case BetActionTypes.FETCH_CONTINENT_START:
            return{
                isFetching: true,
                ...state,
            }
        case BetActionTypes.FETCH_LEAGUE_START:
            return{
                isFetching: true,
                ...state,
                league_data2: state.league_data2,
                display_league: SortLeague(action.payload, 
                    state.league_data, state.fixture_data, state.time_range)
            }
        case BetActionTypes.TOP_NAV_TRIGERRED_START:
            return{
                isFetching: true,
                ...state,
                top_nav_triggered: action.payload
            }
        case BetActionTypes.FETCH_TIMING_RANGE_START:
            return{
                ...state,
                isFetching: true,
                time_range: action.payload,
                accordion_league_names_to_display: LeaguesToDisplay(action.payload,
                     state.country_data, state.league_data, state.fixture_data)
        }
        case BetActionTypes.FETCH_FIXTURE_START:
            return{
                ...state,
                isFetching: true,
            }
        case BetActionTypes.FETCH_FIXTURE_ODDS_START:
            return{
                ...state,
                isFetching: true,
            }
        case BetActionTypes.FETCH_LEAGUE_NAMES_START:
            return{
                ...state,
                isFetching: true,
            }
        case BetActionTypes.FETCH_UPCOMING_GAMES_START:
            return{
                ...state,
                isFetching: true,
                upcoming_games: UpcomingGames(state.fixture_data, state.league_data)
            }
        case BetActionTypes.REMOVE_LEAGUE_START:
            return{
                ...state,
                isFetching: true,
                display_league: RemoveLeague(action.payload, state.display_league)
            }
        case BetActionTypes.FETCH_ACCORDION_HASH_SUCCESS:
            return{
                ...state,
                isFetching: false,
            }        
        case BetActionTypes.FETCH_COUNTRY_SUCCESS:
            return{
                ...state,
                isFetching: false,
            }
        case BetActionTypes.FETCH_CLUB_SUCCESS:
            return{
                ...state,
                isFetching: false,
            }
        case BetActionTypes.FETCH_CONTINENT_SUCCESS:
            return{
                ...state,
                isFetching: false,
            }
        case BetActionTypes.FETCH_LEAGUE_SUCCESS:
            return{
                ...state,
                isFetching: false,
            }
        case BetActionTypes.FETCH_FIXTURE_SUCCESS:
            return{
                ...state,
                isFetching: false,
            }
        case BetActionTypes.FETCH_FIXTURE_ODDS_SUCCESS:
            return{
                ...state,
                isFetching: false,
            }
        case BetActionTypes.FETCH_LEAGUE_NAMES_SUCCESS:
            return{
                ...state,
                isFetching: false,
            }


        // ==================================================================

        
        case BetActionTypes.BET_FRAME_HIDDEN:
            return{
                ...state,
                bet_frame_hidden: action.payload.boolean,
                bet_action_string: action.payload.actionStr,
            }
        case BetActionTypes.FETCH_COUPON_ID_START:
        case BetActionTypes.FETCH_MY_BET_START:
            return{
                ...state,
                isFetching2: true,
                errorMessage: null
            }
        case BetActionTypes.FETCH_COUPON_ID_SUCCESS:
        case BetActionTypes.FETCH_MY_BET_SUCCESS:
            return{
                ...state,
                isFetching2: false,
                isFetching3: false,
                couponID_data: action.payload
            }
        case BetActionTypes.FETCH_COUPON_ID_FAILURE:
        case BetActionTypes.FETCH_MY_BET_FAILURE:
            return{
                ...state,
                isFetching2: false,
                isFetching3: false,
                errorMessage: action.payload
            }
        case BetActionTypes.FETCH_BOOKED_CODE_START:
            return{
                ...state,
                isFetching3: true,
                errorMessage: null
            }
        case BetActionTypes.FETCH_BOOKED_CODE_SUCCESS:
            return{
                ...state,
                isFetching3: false,
                bookingCode: action.payload,
            }
        case BetActionTypes.FETCH_BOOKED_CODE_FAILURE:
            return{
                ...state,
                isFetching3: false,
                errorMessage: action.payload
            }
        case BetActionTypes.POST_BET_START:
            return{
                ...state,
                isFetching3: true,
                errorMessage: null
            }
        case BetActionTypes.POST_BET_SUCCESS:
            return{
                ...state,
                isFetching3: false,
                booking_data: action.payload.dataContent,
                bet_action_string: action.payload.actionStr,
            }
        case BetActionTypes.POST_BET_FAILURE:
            return{
                ...state,
                isFetching3: false,
                errorMessage: action.payload
            }
    
    



        default:
            return state
    }
}
 
export default betReducer;






// BOOKED_CODE_HIDDEN_SUCCESS
// FETCH_COUPON_ID_START
// FETCH_COUPON_ID_SUCCESS