module Main where

import Lib
import Network.Curl
import Data.List.Split
import Text.Regex.PCRE ((=~))
import Text.Read (readMaybe)
import Data.Text (pack, unpack, stripEnd)
import Data.Set (Set, empty, insert, member, size)
import Control.Monad
import Control.Monad.Trans.State.Lazy
import Control.Monad.Trans.Maybe
import Debug.Trace


data Operation = Plus | Minus
type Instruction = (Operation, Integer)

parseInput :: String -> Maybe [Instruction]
parseInput input = 
  let lines = splitOn "\n" input in
  traverse (\x -> do
    num <- readMaybe $ tail x
    if x =~ "^\\+" then
      pure $ (Plus, num)
    else
      pure $ (Minus, num)
  ) lines

solveA :: [Instruction] -> Integer
solveA instructions = 
  foldr (\x acc -> do
    let (op, num) = x
    case op of
      Plus -> acc + num
      Minus -> acc - num
  ) 0 instructions

solveB :: [Instruction] -> Integer
solveB instructions 
  = evalState (solveB' instructions 0) (empty, Nothing)

type SolBState = ((Set Integer), Maybe Integer)

solveB' :: [Instruction] -> Integer -> State SolBState Integer
solveB' instructions num = do
  num' <- foldM (\acc x -> do
          let (op, num) = x
          (set, mSol) <- get
          let mSol' = if (mSol == Nothing) && acc `member` set then
                        Just acc
                      else
                        mSol
          put $ (insert acc set, mSol')
          case op of
            Plus -> pure $ acc + num
            Minus -> pure $ acc - num
         ) num instructions
  (_, mSol) <- get
  case mSol of
    Just sol -> pure sol
    Nothing -> solveB' instructions num'

main :: IO ()
main = do
  (_, responseBody) 
    <- curlGetString "https://adventofcode.com/2018/day/1/input" 
    [ CurlCookie "" 
    ]
  let mSolution = do
        problem <- parseInput $ unpack $ stripEnd (pack responseBody)
        Just $ solveA problem
  case mSolution of
    Just solution ->
      putStrLn $ show solution -- 486
    _ ->
      putStrLn $ show "Failed to find solution a"

  let mSolution' = do
        problem <- parseInput $ unpack $ stripEnd (pack responseBody)
        Just $ solveB problem
  case mSolution' of
    Just solution ->
      putStrLn $ show solution -- 69285
    _ ->
      putStrLn $ show "Failed to find solution b"
