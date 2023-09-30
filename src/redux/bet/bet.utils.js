import moment from 'moment'




export const RemoveLeague = (leagueID, formerObj) => {
    
    const newArray = formerObj.map(i => 
        Object.keys(i)[0] === leagueID ? null : i).filter(i => i)
    return newArray
}

const league_id_list = []
export const SortLeague = (leagueID, league_data, fixture_data, time_range) => {
    if (!league_id_list.includes(leagueID)){
        league_id_list.push(leagueID)
    }
    var current_time_range = null
    var time_frame = []
    time_range.map(({name, active}) => active ? current_time_range = name : null) 
    if (current_time_range === 'Today'){
    }

    let allFixturesByLeague = []
    const fixtureData = Object.keys(fixture_data)
    fixtureData.map(obj => 
        Object.keys(league_data).map(stri => league_data[stri].find(itm => {
            var groupedList  = []
            var newItem = false
            if (Object.keys(itm)[0] === obj){
                Object.keys(fixture_data[obj]).map(fix => {
                    const timeArray = fixture_data[obj][fix]['dateAndTime'].split(',')
                    const dateAndTime = timeArray[0] + timeArray[1]
                    groupedList.map(item => {
                        Object.keys(item).map(stri => {
                            if (stri === dateAndTime) {
                                newItem = false
                                fixture_data[obj][fix]['fixtureID'] = fix
                                item[stri].push(fixture_data[obj][fix])
                                return
                            }
                            else {
                                newItem = true
                                return
                            }
                        })
                    })
                    if (groupedList.length === 0 || newItem){
                        fixture_data[obj][fix]['fixtureID'] = fix
                            groupedList.push({[dateAndTime]: [fixture_data[obj][fix]]})
                    }
                    itm[obj]['items'] = groupedList
                })
                return Object.keys(itm)[0] === obj
            } 
            else if(!fixtureData.includes(Object.keys(itm)[0])){
                itm[Object.keys(itm)[0]]['items'] = []
                return itm
            }
            })
        )
    ).find(i => i)

    Object.keys(league_data).map(stri => league_data[stri].map(itm => {
        if (!Object.keys(itm[Object.keys(itm)[0]]).includes('items')){
            itm[Object.keys(itm)[0]]['items'] = []
        }
        allFixturesByLeague.push(itm)})
    )
    const selectedFixturesByLeague = league_id_list.map(str => 
        allFixturesByLeague.find(itm => {
            if (itm){
                return  Object.keys(itm)[0] === str
                    ? itm : null
            }
        })
    ).filter(i => i)
    return selectedFixturesByLeague
}

export const LeaguesToDisplay = (time_range, country_data, league_data, fixture_data) => {
    return Object.keys(country_data).map(itm => {
        var list = []
        league_data[itm].map(obj => Object.keys(obj).map(id => {
                obj[id]['id'] = id
                list.push(obj[id])
            }
        ))
        
        country_data[itm]['leagues'] = list
        return country_data[itm]
    })
}
export const ChangeCurrentTime = (index, time_range, country_data, league_data) => {
    const name = undefined
    const newTimeRange = time_range.map((obj, pos) =>  {
        if (pos === index){
            name = obj.name
            return {...obj, active: true}
        } else {
            return {...obj, active: false}
        }
    })
    return newTimeRange
}




export const UpcomingGames = (fixtures, leagues) => {
        const todays_date = moment().format('llll').split(',').slice(0,2).join('')
        const allFixturesByLeague = Object.keys(fixtures).map(obj => 
            Object.keys(leagues).map(stri => leagues[stri].find(itm => {
                var groupedList  = []
                var newItem = false
                if (Object.keys(itm)[0] === obj){
                    Object.keys(fixtures[obj]).map(fix => {
                        const timeArray = fixtures[obj][fix]['dateAndTime'].split(',')
                        const dateAndTime = timeArray[0] + timeArray[1]
                        groupedList.map(item => {
                            Object.keys(item).map(stri => {
                                if (stri === dateAndTime) {
                                    newItem = false
                                    fixtures[obj][fix]['fixtureID'] = fix
                                    item[stri].push(fixtures[obj][fix])
                                    return
                                }
                                else {
                                    newItem = true
                                    return
                                }
                            })
                        })
                        if (groupedList.length === 0 || newItem){
                            fixtures[obj][fix]['fixtureID'] = fix
                            if (todays_date === dateAndTime){
                                groupedList.push({[dateAndTime]: [fixtures[obj][fix]]})
                            }
                        }
                        itm[obj]['items'] = groupedList
                    })
                    return Object.keys(itm)[0] === obj
                } 
                // else {
                //     return null
                // }
                })
            ).find(i => i)
        ).filter(i => i)
        return allFixturesByLeague
}