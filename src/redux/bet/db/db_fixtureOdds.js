export const FIXTURES_ODDS = {
    'Popular Market': {
        'Main Markets': {
            '1/2': {
                '1': {}, 'X': {}, '2': {}
            }, 
            'Double Chance': {
                '1X': {}, '12': {}, 'X2': {}
            }
        },
        'GG/NG': {
            'Goal / No Goal': {
                'GG': {}, 'NG': {}
            }, 
            'GG/NG 2+': {
                'GG': {}, 'NG': {}
            } 
        }, 
        'DNB': {
            'Draw No Bet': {
                '1': {}, '2': {}
            }, 
        }, 
        'Handicap': {
            'Handicap': {
                Goal:"", 
                '1': {}, 'X': {}, '2': {}
            }
        }, 
        'HT/FT': {
            'Half Time/Full Time': {
                '1/X': {}, '1/2': {}, 'X/1': {},'X/X': {}, 
                'X/2': {}, '2/1': {},'2/X': {}, '2/2': {}
            }
        }, 
        'Correct Score': {
            'correct Score': {
                'Goals 1-0': [{
                    '1-0': {},'2-2': {}, '3-0': {}, 
                    '2-3': {}, '4-1': {}, '4-4': {},  
                }],

            }
        }, 
        'C.Score Multi(1)': {
            'Multi C.Score (1)':{
                '0-0 / 1-1': {}, '2-2 / 3-3 / 4-4': {},
                '1-0 / 2-0 / 2-1': {}, '0-1 / 0-2 / 1-2': {},
                '3-0 / 3-1 / 3-2': {}, '0-3 / 1-3 / 2-3': {},
                '4-1 / 4-2 / 4-3': {}, '1-4 / 2-4 / 3-4': {},
                '4-0 / 0-4 / Other': {},
            }
        }, 
        'C.Score Multi(2)': {
            'Multi C.Score (2)':{
                '0-0 / 1-1 / 0-1 / 1-0': {},
                '2-0 / 2-1 / 3-0 / 3-1': {},
                '0-2 / 1-2 / 0-3 / 1-3': {},
                '2-2 / 2-3 / 3-2 / 3-3': {},
                '4-0 / 4-1 / 4-2 / 4-3': {},
                '0-4 / 1-4 / 2-4 / 3-4': {},
                '4-4 / other': {},
            }
        },  
        '1X2 Interval 5/10/15': { 
            '1X2 - 5 Minutes': {
                '1':{}, 'X':{}, "2":{}
            },	
            '1X2 - 10 Minutes': {
                '1':{}, 'X':{}, "2":{}
            }, 
         },
        '1X2 Interval 20/30/60': { 
            '1X2 - 20 Minutes': {
                '1':{}, 'X':{}, "2":{}
            },	
            '1X2 - 30 Minutes': {
                '1':{}, 'X':{}, "2":{}
            }, 
         },
        'Score Interval 5/10':  { 
            'Score 5 Minutes': {
                'Yes':{}, 'No':{},
            },	
            'Score 10 Minutes': {
                'Yes':{}, 'No':{},
            }, 
         },
        'Score Interval 20/30':  { 
            'Score 20 Minutes': {
                'Yes':{}, 'No':{},
            },	
            'Score 30 Minutes': {
                'Yes':{}, 'No':{},
            }, 
         }, 
        'First/Last Goal': { 
            'First Team To Score': {
                '1':{}, 'No Goal':{}, '2':{},
            },	
            'First Team To Score': {
                '1':{}, 'No Goal':{}, '2':{},
            }, 
        }, 
        'Odd/Even': {
            'Odd/Even': {
                'Odd': {}, 'even': {}
            }
        }, 
        'Total Goal (Exact)':{
            'Total Goal (Exact)': {
                '1': {},'2': {},'3': {},'4': {},'5': {},'6': {}, 
            }
        }
    },
    '1st Half Markets': {
        'Main Markets HT': {
            '1st Half - 1X2': {
                '1': {}, 'X': {}, '2': {},
            },
            '1st Half - Double Chance': {
                '1X': {}, '12': {}, 'X2': {},
            }
        }, 
        'GG/NG HT': {
            '1st Half - Goal / No Goal': {
                'GG': {},'NG': {},
            }, 
        }, 
        'DNB HT': {
            '1st Half - Draw No Bet': {
                '1': {}, '2': {}
            }
        }, 
        'Correct Score HT': {
            '1st Half - Correct Score': {
                'Goals 1-0': [{
                    '1-0': {},'2-2': {}, '3-0': {}, 
                    '2-3': {}, '4-1': {}, '4-4': {},  
                }],
            }
        },
        'Home/Away/Ov/Un HT': {
            '1st Half - Home/Away Over/Under': {
                'Goals 1-0': [{
                    '1-0': {},'2-2': {}, '3-0': {}, 
                    '2-3': {}, '4-1': {}, '4-4': {},  
                }],
                'Home Over':{},'Away Over': {},
                'Home Under': {},'Away Under': {}
            }
        },
        'To Score HT': {
            'Home Score 1st Half':{
                'Yes': {}, 'No': {}
            },
            'Away Score 1st Half':{
                'Yes': {}, 'No': {}
            }
        }, 
        'Win To Nil HT': {
            'Home Win to 0 1st Half':{
                'Yes': {}, 'No': {}
            },
            'Away Win to 0 1st Half':{
                'Yes': {}, 'No': {}
            }
        },  
        'Total Goals HT': {
            '1st Half - Total Goals':{
                '1': {}, '2': {}, '3': {}
            },
        },  
        'Odds/Even HT': {
            '1st Half - Odd/Even':{
                'Odd': {}, 'Even': {}
            },
        }, 
        'European H. 1st Half': {
            'European H. 1st Half':{
                'Goals 1-0': [{
                    '1-0': {},'2-2': {}, '3-0': {}, 
                    '2-3': {}, '4-1': {}, '4-4': {},  
                }],
                '1': {}, 'X': {}, '2': {}
            }
        },  
    },
    '2nd Half Markets': {
        'Main Markets 2HT': {
            '2nd half - 1X2': {
                '1': {}, 'X': {}, '2': {},
            },
            '2nd half - Double Chance': {
                '1X': {}, '12': {}, 'X2': {},
            },
        }, 
        'GG/NG 2HT': {
            '2nd Half - Goal/No Goal': {
                'GG': {}, "NG": {}
            }
        }, 
        'DNB 2HT': {
            '2nd Half - Draw No Bet': {
                '1': {}, '2': {}
            }
        }, 
        'Correct Score 2HT': {
            '2nd Half - Correct Score': {
                'Goals 1-0': [{
                    '1-0': {},'2-2': {}, '3-0': {}, 
                    '2-3': {}, '4-1': {}, '4-4': {},  
                }],
            }
        }, 
        'To Score 2HT': {
            'Home Score 2nd Half': {
                'Yes': {}, 'No': {}
            },
            'Away Score 2nd Half': {
                'Yes': {}, 'No': {}
            }
        }, 
        'Win To Nil 2HT': {
            'Home Win To Nil 2HT': {
                'Yes': {}, 'No': {}
            },
            'Away Win To Nil 2HT': {
                'Yes': {}, 'No': {}
            }
        }, 
        'Total Goals 2HT': {
            '2nd Half - Total Goals': {
                '1': {}, '2': {}, '3': {}
            }
        },  
        'Odds/Even 2HT': {
            '2nd Half - Odd/Even': {
                'Odd': {}, 'Even': {}
            }
        },   
        'European H. 2nd Half': {
            'European H. 2nd Half': {
                '1': {}, '2': {}, '3': {}
            }
        },
        '2HT Home/Away/Ov/Un': {
            '2nd Half - Home/Away Over/Under': {
                'Home Over': {}, 'Away Over': {},
                'Home Under': {}, 'Away Under': {},
            }
        },
    },
    'Home / Away': {
        'To Score': {
            'home to score':{
                'yes': {}, 'no': {},
            }, 
            'away to score': {
                'yes': {}, 'no': {},
            }
        }, 
        'Home/Away/Over/Under': {
            'Home/Away - Over/Under':{
                'Home Over': {}, 'Away Over': {},
                'Home Under': {}, 'Away Under': {},
            }, 
        },  
        'No Bet': {
            'Home No Bet':{
                'X': {}, '2': {},
            }, 
            'Away No Bet': {
                'X': {}, '2': {},
            }
        }, 
        'Clean Sheet': {
            'Clean Sheet Home':{
                'yes': {}, 'no': {},
            }, 
            'Clean Sheet Away': {
                'yes': {}, 'no': {},
            }
        }, 
        'Wins Both Halves': {
            'Home Win Both Halves	':{
                'yes': {}, 'no': {},
            }, 
            'Away Win Both Halves	': {
                'yes': {}, 'no': {},
            }
        }, 
        'Score Both Halves': {
            'Home Score Both Halves':{
                'yes': {}, 'no': {},
            }, 
            'Away Score Both Halves': {
                'yes': {}, 'no': {},
            }
        },  
        'Wins Either Halves': {
            'Home Win Either Half':{
                'yes': {}, 'no': {},
            }, 
            'Away Win Either Half': {
                'yes': {}, 'no': {},
            }
        }, 
        'Goals Exact': {
            'Home Goals Exact':{
                '0': {}, '1': {}, '2': {}, '3': {},
            }, 
        }, 
        'Win To Nil': {
            'Home Win to Nil':{
                'yes': {}, 'no': {},
            }, 
            'Away Win to Nil': {
                'yes': {}, 'no': {},
            }
        }, 
        'Odd/Even': {
            'Odd/Even Home':{
                'Odd': {}, 'Even': {},
            }, 
            'Odd/Even Away': {
                'Odd': {}, 'Even': {},
            }
        }, 
        'Half 1st Goal': {
            'Half 1st Goal Away': {
                'First Half': {}, 'No Goal Away': {}, 'Second Half': {}
            }, 
        }, 
        'Highest Scoring Half': {
            'Highest Scoring Half Home Team':{
                '1st': {}, 'Tie': {}, '2nd': {}
            }, 
            'Highest Scoring Half Away Team': {
                '1st': {}, 'Tie': {}, '2nd': {}
            }
        }, 
    },
    'Combined Market': {
        '1X2 & Over/Under': {
            '1X2 & Over/Under': {
                Goal: ['1.5','2.5','3.5','4.5'],
                '1 & Over':{}, 'X & Over':{}, '2 & Over':{}, 
                '1 & Under':{}, 'X & Under':{}, '2 & Under':{},
            }
        }, 
        '1X2 & Goal/No Goal': {
            '1X2 & Goal/No Goal': {
                '1 & GG': {},'X & GG': {},'2 & GG': {},
                '1 & NG': {},'X & NG': {},'2 & NG': {},
            }
        }, 
        'Double Chance & Over/Under': {
            '1X2 Or Goal/No Goal': {
                '1 & GG': {},'X & GG': {},'2 & GG': {},
                '1 & NG': {},'X & NG': {},'2 & NG': {},
            }
        }, 
        'Double Chance & Goal / No Goal': {
            'Chance Mix +': {
                '1 HT or 1 FT':{},'X HT or X FT':{},'2 HT or 2 FT':{},
                '1 HT or GG HT':{},'X HT or GG HT':{},'2 HT or GG HT':{},
            }
        }, 
    },
    'Multi Goal': {
        'Multi Goal': {
            'Multi Goal': {
                Goals: [{
                    '1-2': {}, '1-3': {},  '1-4': {},  '1-5': {}, 
                }]
            }
        }, 
        'Multi Goal HT/2HT': {
            '1st Half - Multi Goal': {
                '1-2':{},'1-3':{},'2-3':{},
            },
            '2nd Half - Multi Goal': {
                '1-2':{},'1-3':{},'2-3':{},
            }
        }, 
        'Multi Goal Home/Away': {
            'Multi Goal Home': {
                '1-2 Goals':{},'1-3 Goals':{},'2-3 Goals':{},
            },
            'Multi Goal Away': {
                '1-2 Goals':{},'1-3 Goals':{},'2-3 Goals':{},
            }
        }, 
        '1X2/DC & 1-2 Goal': {
            '1X2 & Multi Goal 1-2': {
                '1':{},'X':{},'2':{},
            },
            'DC & Multi Goal 1-2': {
                '1X':{},'12':{},'X2':{},
            }
        }, 
        '1X2/DC & 1-3 Goals': {
            '1X2 & Multi Goal 1-3': {
                '1':{},'X':{},'2':{},
            },
            'DC & Multi Goal 1-3': {
                '1X':{},'12':{},'X2':{},
            }
        }, 
        '1X2/DC & 1-4 Goals': {
            '1X2 & Multi Goal 1-4': {
                '1':{},'X':{},'2':{},
            },
            'DC & Multi Goal 1-4': {
                '1X':{},'12':{},'X2':{},
            }
        }, 
        '1X2/DC & 1-5 Goals': {
            '1X2 & Multi Goal 1-5': {
                '1':{},'X':{},'2':{},
            },
            'DC & Multi Goal 1-5': {
                '1X':{},'12':{},'X2':{},
            }
        }, 
        '1X2/DC & 2-3 Goals': {
            '1X2 & Multi Goal 2-3': {
                '1':{},'X':{},'2':{},
            },
            'DC & Multi Goal 2-3': {
                '1X':{},'12':{},'X2':{},
            }
        }
    } ,
    'Others': {
        'Penalty': {
            'Penalty': {
                'yes': {}, 'no': {},
            },
            'Penalty Scored/Missed': {
                'Pen.Scored': {}, 'Pen.Missed': {},
            }
        }, 
        'At Least a Half X': {
            'At Least a Half X': {
                'yes': {}, 'no': {},
            }
        }, 
        'Win Margin': {
            'Win Margin': {
                'Home by 1': {},'Home by 2': {},'Home by > 2': {},'Draw': {},
                'Away by 1': {},'Away by 2': {},'Away by > 2': {},
            }
        }, 
        'Half 1st Goal': {
            'Half 1st Goal': {
                '1st Half': {},'No Goal': {},'2nd Half': {}
            }
        }, 
        'Highest Scoring Half': {
            'Highest Scoring Half': {
                '1st': {},'Tie': {},'2nd': {}
            }
        }, 
        'Team To Score': {
            'Team To Score': {
                Goal: ['1.5','2.5','3.5','4.5'],
                'Only Home': {},'Only Away': {},'No Goal': {},
            }
        }, 
    }
  }
















