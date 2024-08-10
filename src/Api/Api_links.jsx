const Api_links = {
  application_id : "0a5b831ff6f686e88871c43ffbf9df82",
  url_address: {
    asia: "https://api.worldofwarships.asia/",
    eu: "https://api.worldofwarships.eu/",
    na: "https://api.worldofwarships.com/",
    
  },

  PATH_ADDRESS: {
    Account: {
      Players: "/wows/account/list/",
      Player_personal_data: "/wows/account/info/",
      Players_achievements: "/wows/account/achievements/",
      Player_statistics_by_date: "/wows/account/statsbydate/",
    },
    Encyclopedia: {
      Information_about_encyclopedia: "/wows/encyclopedia/info/",
      Warships: "/wows/encyclopedia/ships/",
      Achievements: "/wows/encyclopedia/achievements/",
      Ship_parameters: "/wows/encyclopedia/shipprofile/",
      Modules: "/wows/encyclopedia/modules/",
      Service_Record_levels_information: "/wows/encyclopedia/accountlevels/",
      Commanders: "/wows/encyclopedia/crews/",
      Commander_Skills: "/wows/encyclopedia/crewskills/",
      Commanders_Ranks: "/wows/encyclopedia/crewranks/",
      Battle_types: "/wows/encyclopedia/battletypes/",
      Consumables: "/wows/encyclopedia/consumables/",
      Collections: "/wows/encyclopedia/collections/",
      Collection_items: "/wows/encyclopedia/collectioncards/",
      Maps: "/wows/encyclopedia/battlearenas/",
    },
    Warships: {
      Statistics_of_players_ships: "/wows/ships/stats/",
    },
    Seasons: {
      Ranked_Battles_seasons: "/wows/seasons/info/",
      Ships_statistics_in_Ranked_Battles: "/wows/seasons/shipstats/",
      Players_statistics_in_Ranked_Battles: "/wows/seasons/accountinfo/",
    },
    Clans: {
      Clans: "/wows/clans/list/",
      Clan_details: "/wows/clans/info/",
      Player_clan_data: "/wows/clans/accountinfo/",
      Clan_glossary: "/wows/clans/glossary/",
      Clan_Battle_Seasons: "/wows/clans/season/",
      Clan_battles_season_stats: "/wows/clans/seasonstats/",
    },
  },
};

export default Api_links;