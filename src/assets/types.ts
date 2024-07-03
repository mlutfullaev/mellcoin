export interface IUser {
  id: number,
  first_name: string,
  last_name: string,
  inviter_id: null | number,
  level: number,
  balance: string,
  level_coints_cnt: number,
  hour_profit: number,
}

export interface IStake {
  id: number,
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

export interface ITask {
  id: number,
  name: string,
  recurrent: number,
  recurrent_rules: string,
  approve_requirements: string,
  reward: string,
  type: number,
}