'use client'

import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useQuery from '@/hooks/useQuery';
import { useUserAppDispatch } from '@/redux/hooks';
import { setMaintenance } from '@/redux/slices/user-global';

type GameLevel = 'easy' | 'medium' | 'hard';

export default function Component() {
  const [score, setScore] = useState(0);
  const [starPosition, setStarPosition] = useState({ x: 0, y: 0 });
  const [showStar, setShowStar] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameLevel, setGameLevel] = useState<GameLevel>('easy');
  const [timeLeft, setTimeLeft] = useState(60);
  const dispatch = useUserAppDispatch();

  const {data:checkServer,isLoading} = useQuery('users/check-server',()=>{},false);

  if(!isLoading && checkServer?.status == 200){
      dispatch(setMaintenance(false));
      window.location.reload();
  }

  // Cache window dimensions to avoid multiple reads
  const windowDimensions = useMemo(
    () => ({ width: window.innerWidth, height: window.innerHeight }),
    []
  );

  const getStarInterval = useCallback(() => {
    switch (gameLevel) {
      case 'easy':
        return 2000;
      case 'medium':
        return 1500;
      case 'hard':
        return 1000;
      default:
        return 2000;
    }
  }, [gameLevel]);

  const getStarDelay = useCallback(() => {
    switch (gameLevel) {
      case 'easy':
        return 1000;
      case 'medium':
        return 750;
      case 'hard':
        return 500;
      default:
        return 1000;
    }
  }, [gameLevel]);

  useEffect(() => {
    if (!gameStarted) return;

    const starInterval = setInterval(() => {
      setShowStar(false);
      setTimeout(() => {
        setStarPosition({
          x: Math.random() * (windowDimensions.width - 100),
          y: Math.random() * 200,
        });
        setShowStar(true);
      }, getStarDelay());
    }, getStarInterval());

    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setGameStarted(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(starInterval);
      clearInterval(timerInterval);
    };
  }, [gameStarted, gameLevel, windowDimensions]);

  // Memoized intervals and delays to avoid recalculating them unnecessarily
 

  const catchStar = () => {
    setScore((prevScore) => prevScore + 1);
    setShowStar(false);
  };

  const startGame = (level: GameLevel) => {
    setGameLevel(level);
    setGameStarted(true);
    setScore(0);
    setTimeLeft(60);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-primary p-4 overflow-hidden relative">
      {/* Animated star background */}
      {useMemo(
        () =>
          [...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{
                x: Math.random() * windowDimensions.width,
                y: Math.random() * windowDimensions.height,
                opacity: Math.random(),
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          )),
        [windowDimensions]
      )}

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="mb-8"
      >
        <Settings className="w-16 h-16 text-blue-300" />
      </motion.div>
    
       
      <p className="text-center text-blue-200 max-w-md mb-8 text-lg">
      Maintenance in Progress !!
        We're upgrading our systems. While you wait, embark on a stellar adventure!
      </p>
      {gameStarted ? (
        <div className="flex items-center justify-between w-full max-w-md mb-6">
          <motion.div
            className="text-lg font-bold bg-neon-primary text-white px-6 py-3 rounded-2xl shadow-lg"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            Score: {score}
          </motion.div>
          <motion.div
            className="text-lg font-bold bg-red-500 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center"
            animate={{ scale: timeLeft <= 10 ? [1, 1.1, 1] : 1 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            <Clock className="mr-2 h-6 w-6" />
            {timeLeft}s
          </motion.div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Select Difficulty</h2>
          <div className="flex gap-4">
            <Button
              onClick={() => startGame('easy')}
              className="text-lg font-bold bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Easy
            </Button>
            <Button
              onClick={() => startGame('medium')}
              className="text-lg font-bold bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Medium
            </Button>
            <Button
              onClick={() => startGame('hard')}
              className="text-lg font-bold bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Hard
            </Button>
          </div>
        </div>
      )}
      <div className="relative w-full md:min-h-80 min-h-96 bg-gradient-to-b from-transparent to-neon-primary rounded-3xl overflow-hidden shadow-2xl border border-primary">
        <AnimatePresence>
          {showStar && gameStarted && (
            <motion.button
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0, rotate: 180 }}
              transition={{ duration: 0.5, type: 'spring' }}
              style={{
                position: 'absolute',
                left: starPosition.x,
                top: starPosition.y,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={catchStar}
              onKeyDown={(e) => e.key === 'Enter' && catchStar()}
              className="focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 rounded-full p-2"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              >
                <Star className="w-12 h-12 text-yellow-300 filter drop-shadow-lg" />
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
