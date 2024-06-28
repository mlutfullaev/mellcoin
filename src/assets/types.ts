export interface IUser {
  id: number,
  first_name: string,
  last_name: string,
  inviter_id: null | number,
  level: number,
  balance: number,
  level_coints_cnt: number,
  hour_profit: number,
}

export interface IStake {
  name: string,
  percent: string,
  hold: number,
  min_amount: string,
  max_amount: string,
}

export interface ICasino {
  id: number,
  name: string,
  type: number,
  drop_chance: number,
  value: string,
}

export interface IBoost {
  id: number,
  name: string,
  picture_url: string,
  max_lvl: number,
  initial_cost: string,
  is_can_buy: boolean,
  is_active: boolean,
}