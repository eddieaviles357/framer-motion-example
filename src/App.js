import { motion, useAnimate, useAnimation, stagger } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

/* A delay, in seconds, from which to start the stagger from.
   stagger(0.5, { startDelay: 1 }) // 1, 1.5, 2... */

/* Stagger out from the third element (index: 2) */
/* stagger(0.1, { from: 2 })
stagger(2.1, { from: 2, startDelay: 0.3 }); */

/* from: "first" | "last" | "center" | number 
   stagger(0.1, { from: "center" })
   stagger(2.1, { from: 'last', startDelay: 0.3 });
   stagger(2.1, { from: 'last', startDelay: 0.3, ease: [.32, .23, .4, .9] }); */
const staggerDiv = stagger(0.1, { from: 'first', startDelay: 0.8, ease: "easeOut" });
const staggerHeader = stagger(0.1, { startDelay: 0.8 });

const boxVariant = {
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5
    }
  },
  hidden: {
    opacity: 0,
    scale: 1
  }
};

// card animation when element is scrolled 
const cardVariants = {
  offscreen: {
    // x: 300,
    y: 300,
  },
  onscreen: {
    // x: 50,
    y: 50,
    rotate: -3,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};

const useMenuAnimation = (inView) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate('h1', inView
      ? {
        opacity: 1,
        scale: 1,
        background: 'green'
      }
      : {
        opacity: 1,
        scale: 0.8,
        background: 'white'
      }, {
      duration: 0.2,
      delay: inView ? staggerHeader : 0
    });

    animate('div', inView
      // will change here with a delay when inView is true
      ? {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        boxShadow: '3px 3px 3px black',
        background: 'yellow'
      }
      // will show first since there is no delay when inView is false
      : {
        opacity: 0.8,
        scale: 1,
        filter: "blur(1px)",
        background: 'gray'
      }, {
      duration: 0.2,
      delay: inView ? staggerDiv : 0
    });
  }, [inView, animate]);

  return scope;
}

const Box = ({ num, children }) => {
  const control = useAnimation();
  const [ref, inView] = useInView();
  const scope = useMenuAnimation(inView)

  useEffect(() => {

    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  return (
    <motion.div
      className="box"
      ref={ref}
      variants={boxVariant}
      initial="hidden"
      animate={control}
    >
      <p ref={scope}>Box {num}
        {children}
      </p>
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: false, amount: 0.8 }}
      >

        <motion.div className="card" variants={cardVariants}>
          cards {num}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  return (
    <div className="App">
      <Box num={1}>
        <div className="hello">div1</div>
        <div>div2</div>
        <div>div3</div>
        <div>div4</div>
        <h1 className="header">Header</h1>
      </Box>
      <Box num={2}>
        <div className="hello">div1 .hello</div>
        <div>div2</div>
        <div>div3</div>
        <div>div4</div>
        <h1 className="header">Header</h1>
      </Box>
      <Box num={3}>
        <div className="hello">div1 .hello</div>
        <div>div2</div>
        <div>div3</div>
        <div>div4</div>
        <h1 className="header">Header</h1>
      </Box>
    </div>
  );
}