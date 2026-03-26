export const SCENARIOS = {
  exclusion: {
    id: "exclusion",
    unit: "Unit 2: You and Others",
    title: "1. The Playground Dilemma",
    subtitle: "Understanding Empathy & Inclusion",
    icon: "Users",
    color: "#C8E8D5",
    lessons: [
      {
        title: "What is Empathy?",
        content: "Empathy is the superpower of stepping into someone else's shoes. It means trying to feel what they are feeling, even if you are not in their situation.",
        icon: "Eye"
      },
      {
        title: "The Sting of Exclusion",
        content: "When a person feels left out, their brain actually reacts the exact same way it does when they get hurt physically! Being excluded hurts just like a scraped knee.",
        icon: "ShieldCheck"
      },
      {
        title: "Your Mission",
        content: "Today, you will practice stepping into the shoes of someone who is left out. Your goal is to use Empathy to help them feel safe and included.",
        icon: "Activity"
      }
    ],
    nodes: {
      start: {
        text: "Scenario: Mia is feeling excluded on the playground. She is standing alone near the swings while others play tag.",
        miaText: "Scenario: You are standing alone near the swings. Everyone else is playing tag, and no one has asked you to join. It feels awful.",
        activity: "Observe the Situation",
        question: "What is your first step?",
        emotions: { sad: 80, anxious: 60, lonely: 90, worried: 70 },
        choices: [
          { text: "Walk up and say hi", target: "approach" },
          { text: "Wave from far away", target: "wave" },
          { text: "Keep playing tag", target: "ignore_1" }
        ]
      },
      approach: {
        text: "Scenario: You walk up to Mia. She looks up, surprised but a little hopeful.",
        miaText: "Scenario: The kid walks up to you. Your heart beats a little faster. Are they going to say hi to you?",
        activity: "Make a Connection",
        question: "What do you say to her?",
        emotions: { sad: 40, anxious: 40, lonely: 50, worried: 40 },
        choices: [
          { text: "Ask if she wants to play tag", target: "invite_tag" },
          { text: "Ask what she is doing", target: "ask_doing" },
          { text: "Offer her part of your snack", target: "offer_snack" }
        ]
      },
      ask_doing: {
        text: "Scenario: You ask what she's doing. She shrugs and says, 'Nothing. I don't like tag very much.'",
        miaText: "Scenario: You tell them you don't like tag. You hope they don't think you are weird or boring.",
        activity: "Pivot the Interaction",
        question: "She doesn't want to play your game. Now what?",
        emotions: { sad: 30, anxious: 50, lonely: 40, worried: 45 },
        choices: [
          { text: "Ask what game she DOES want to play", target: "ask_preference" },
          { text: "Ask her what her favorite hobby is", target: "ask_hobby" },
          { text: "Say 'Okay, see ya' and leave", target: "ignore_2" }
        ]
      },
      ask_preference: {
        text: "Scenario: She looks down at her shoes. 'I don't know... maybe four-square, but the older kids are using the ball.'",
        miaText: "Scenario: You want to play four-square, but you are too afraid of the 5th graders to go get a ball.",
        activity: "Identify the Obstacle",
        question: "She identified an obstacle. How do you help?",
        emotions: { sad: 20, anxious: 80, lonely: 30, worried: 60 },
        choices: [
          { text: "Tell her the older kids are scary too, let's just sit here.", target: "sit_together" },
          { text: "Offer to go ask the older kids for the ball together.", target: "brave_together" }
        ]
      },
      brave_together: {
        text: "Scenario: You offer to go with her to ask the older kids. She smiles. 'Okay,' she says. You walk over together and politely ask for a ball. They give you one!",
        miaText: "Scenario: Knowing someone is doing the scary thing with you makes it so much easier. You both get the ball!",
        activity: "Success!",
        question: "You successfully helped Mia overcome her anxiety.",
        emotions: { sad: 0, anxious: 10, lonely: 0, worried: 0 },
        choices: [
          { text: "Complete Lesson", target: "COMPLETE" }
        ]
      },
      sit_together: {
        text: "Scenario: You both sit by the swings for the rest of recess. It's safe, but neither of you is playing.",
        miaText: "Scenario: You're glad you aren't alone, but sitting on a bench for 20 minutes is a little boring.",
        activity: "Partial Success",
        question: "You solved the loneliness, but reinforced the fear of the older kids.",
        emotions: { sad: 10, anxious: 50, lonely: 10, worried: 40 },
        choices: [
          { text: "Rewind and find a more constructive solution", target: "ask_preference" }
        ]
      },
      ask_hobby: {
        text: "Scenario: She brightens up a lot! 'I really like drawing dinosaurs,' she says enthusiastically.",
        miaText: "Scenario: Finally, someone asked about your favorite thing! You love drawing dinosaurs so much.",
        activity: "Build Common Ground",
        question: "She shared her favorite thing. Connect with it.",
        emotions: { sad: 10, anxious: 20, lonely: 10, worried: 10 },
        choices: [
          { text: "Tell her you love drawing too.", target: "drawing_bond" },
          { text: "Say 'Dinosaurs are for babies.'", target: "insult" }
        ]
      },
      drawing_bond: {
        text: "Scenario: You tell her you love drawing. She pulls out a notebook and you both spend recess drawing an epic T-Rex.",
        miaText: "Scenario: You found someone who likes the exact same things as you! You feel completely accepted.",
        activity: "Success!",
        question: "You built a lasting connection over a shared interest.",
        emotions: { sad: 0, anxious: 0, lonely: 0, worried: 0 },
        choices: [
          { text: "Complete Lesson", target: "COMPLETE" }
        ]
      },
      insult: {
        text: "Scenario: You make fun of her interest. She immediately shuts down, puts her notebook away, and turns her back to you.",
        miaText: "Scenario: They made fun of you. You feel humiliated and stupid. You wish you never said anything.",
        activity: "Invalidation Warning",
        question: "You humiliated her, breaking all trust.",
        emotions: { sad: 100, anxious: 90, lonely: 100, worried: 80 },
        choices: [
          { text: "Rewind and try validating her interest", target: "ask_hobby" }
        ]
      },
      invite_tag: {
        text: "Scenario: You invite her to play tag. She shrinks back. 'I'm not very fast. I'll just get 'it' the whole time.'",
        miaText: "Scenario: You panic. Tag means running, and you know you're not fast. You feel embarrassed.",
        activity: "Address Insecurity",
        question: "She's feeling insecure. How do you respond?",
        emotions: { sad: 20, anxious: 70, lonely: 40, worried: 60 },
        choices: [
          { text: "Ensure her you'll protect her if she tries", target: "tag_try" },
          { text: "Tell her she has to try anyway", target: "force_try" }
        ]
      },
      tag_try: {
        text: "Scenario: You tell her, 'If you get tagged, I'll trade places with you!' She looks unsure, but agrees to walk toward the field with you.",
        miaText: "Scenario: Having a backup plan makes you feel braver. You decide to try walking to the field.",
        activity: "Navigating the Group",
        question: "You approach the big group playing tag. What next?",
        emotions: { sad: 10, anxious: 50, lonely: 20, worried: 40 },
        choices: [
          { text: "Yell: 'Mia is playing now!' to the group", target: "tag_yell" },
          { text: "Quietly ask the person who is 'It' to give Mia a 10-second head start", target: "tag_quiet" }
        ]
      },
      tag_yell: {
        text: "Scenario: You yell to everyone that she's playing. Suddenly 10 kids turn and stare at Mia. She blushes furiously.",
        miaText: "Scenario: Too much attention! Everyone is staring at you. You feel completely put on the spot and want to hide.",
        activity: "Overstimulation",
        question: "You drew too much sudden attention to a shy child.",
        emotions: { sad: 40, anxious: 100, lonely: 30, worried: 90 },
        choices: [
          { text: "Rewind and use a low-pressure approach", target: "tag_try" }
        ]
      },
      tag_quiet: {
        text: "Scenario: You quietly arrange a head start with the kid who is 'It'. Mia gets a huge head start and laughs as she runs across the field, having fun.",
        miaText: "Scenario: That was perfect. Nobody stared, and the head start made you feel like you actually had a chance. You love playing tag now!",
        activity: "Success!",
        question: "You successfully integrated an anxious child into a large group activity.",
        emotions: { sad: 0, anxious: 10, lonely: 0, worried: 0 },
        choices: [
          { text: "Complete Lesson", target: "COMPLETE" }
        ]
      },
      force_try: {
        text: "Scenario: You tell her she has to try. She shakes her head and backs away, looking overwhelmed.",
        miaText: "Scenario: They are pressuring you. You feel your chest tighten. You just want them to go away now.",
        activity: "Re-evaluate",
        question: "Pushing her made it worse.",
        emotions: { sad: 50, anxious: 90, lonely: 60, worried: 80 },
        choices: [
          { text: "Okay, let's play something slower instead.", target: "ask_preference" },
          { text: "Leave her alone", target: "ignore_2" }
        ]
      },
      offer_snack: {
        text: "Scenario: You offer her a cracker. She smiles and takes one. 'Thanks,' she says, 'I was hungry.'",
        miaText: "Scenario: They offered you food! It's a really nice gesture and makes you feel much more comfortable.",
        activity: "Build Trust",
        question: "You broke the ice. What's next?",
        emotions: { sad: 10, anxious: 20, lonely: 20, worried: 10 },
        choices: [
          { text: "Invite her to sit and eat together", target: "snack_talk" }
        ]
      },
      snack_talk: {
        text: "Scenario: You both sit on the bench splitting the crackers. You ask her what her favorite animal is.",
        miaText: "Scenario: Sitting on the bench sharing a snack is great. They want to know what your favorite animal is!",
        activity: "Deepen the Connection",
        question: "The conversation is flowing. How do you respond?",
        emotions: { sad: 0, anxious: 10, lonely: 0, worried: 0 },
        choices: [
          { text: "Say: 'Wolves are the best.' Then suggest playing 'Wolf Pack'", target: "snack_wolf" }
        ]
      },
      snack_wolf: {
        text: "Scenario: You suggest playing 'Wolf Pack', an imaginary game. She howls playfully and you spend recess pretending to be wolves.",
        miaText: "Scenario: This is the best recess ever! You have a new friend and an amazing new game.",
        activity: "Success!",
        question: "You successfully created an inclusive, imaginative play environment.",
        emotions: { sad: 0, anxious: 0, lonely: 0, worried: 0 },
        choices: [
          { text: "Complete Lesson", target: "COMPLETE" }
        ]
      },
      wave: {
        text: "Scenario: You wave from afar. Mia waves back weakly, but stays glued to the swings. She still looks left out.",
        miaText: "Scenario: You see someone wave. You wave back, but they don't come over. You still feel too shy to walk over there yourself.",
        activity: "Re-evaluate",
        question: "Waving was nice, but passively waiting wasn't enough.",
        emotions: { sad: 70, anxious: 50, lonely: 80, worried: 60 },
        choices: [
          { text: "Go over and actually talk to her", target: "approach" },
          { text: "Assume she wants to be alone", target: "ignore_1" }
        ]
      },
      ignore_1: {
        text: "Scenario: You keep playing tag. Time passes. A teacher eventually notices Mia looking sad and goes over to talk to her.",
        miaText: "Scenario: They kept playing. A teacher is coming over to talk to you. Now it feels like everyone knows you have no friends.",
        activity: "Reflect on Impact",
        question: "The situation was poorly handled. The teacher had to intervene.",
        emotions: { sad: 90, anxious: 80, lonely: 100, worried: 70 },
        choices: [
          { text: "Rewind and step up as a friend", target: "start" }
        ]
      },
      ignore_2: {
        text: "Scenario: You walk away. Mia stays by the swings, looking completely defeated. The bell rings for the end of recess.",
        miaText: "Scenario: They left. You sit by the fence until the bell rings. Another recess spent entirely alone.",
        activity: "Reflect on Impact",
        question: "You gave up too quickly.",
        emotions: { sad: 100, anxious: 90, lonely: 100, worried: 90 },
        choices: [
          { text: "Rewind and try being more persistent", target: "ask_doing" }
        ]
      }
    }
  },
  anger: {
    id: "anger",
    unit: "Unit 1: The Inner World",
    title: "2. The Broken Toy",
    subtitle: "Anger & Conflict Resolution",
    icon: "HelpCircle", 
    color: "#EAB8B8",
    lessons: [
      {
        title: "The Brain on Fire",
        content: "When someone breaks your things, a tiny part of your brain called the Amygdala takes over. It's like an alarm system that yells 'DANGER!' and pumps you full of hot energy to protect yourself.",
        icon: "Brain"
      },
      {
        title: "The Pause",
        content: "Anger makes us want to yell or fight immediately. But if we take just a 5-second pause, we give perfectly good oxygen time to reach the 'Thinking' part of our brain.",
        icon: "Clock"
      },
      {
        title: "Underneath the Anger",
        content: "Often, anger is a mask. Deep underneath the mad feeling of a broken toy is actually just sadness and grief that your favorite thing is ruined.",
        icon: "Book"
      }
    ],
    nodes: {
      start: {
        text: "Scenario: Mia brought her favorite toy airplane to school. A classmate runs past and accidentally steps on it, snapping the wing off. Mia's face turns red and her fists clench.",
        miaText: "Scenario: Your favorite toy is ruined! You brought it to show everyone, and now it's broken. You feel hot all over and want to scream.",
        activity: "Identify the Threat Level",
        question: "Mia is furious. What do you do?",
        emotions: { sad: 20, anxious: 50, lonely: 10, worried: 40 }, 
        choices: [
          { text: "Yell at the kid who broke it", target: "yell" },
          { text: "Tell a teacher immediately", target: "teacher" },
          { text: "Try to help her pick up the pieces", target: "pick_up" }
        ]
      },
      yell: {
        text: "Scenario: You start yelling at the kid who stepped on it. The kid yells back defending himself. Now Mia is screaming too. It's a chaotic mess.",
        miaText: "Scenario: Everyone is yelling. You are so mad, but the loud noises are making you feel completely overwhelmed and out of control.",
        activity: "Escalation",
        question: "Yelling escalated the situation.",
        emotions: { sad: 50, anxious: 100, lonely: 30, worried: 100 },
        choices: [
          { text: "Rewind and choose a calmer approach", target: "start" }
        ]
      },
      teacher: {
        text: "Scenario: You run to get the teacher. When you return, Mia is in a tug-of-war with the kid over the broken pieces.",
        miaText: "Scenario: The other kid tried to pick up the toy, but YOU wanted to pick it up! Now they are stealing it! You pull as hard as you can.",
        activity: "Re-evaluate",
        question: "Leaving Mia alone allowed the conflict to turn physical.",
        emotions: { sad: 90, anxious: 80, lonely: 40, worried: 90 },
        choices: [
          { text: "Rewind to de-escalate it before leaving", target: "start" }
        ]
      },
      pick_up: {
        text: "Scenario: You kneel down next to Mia and block the other kid. 'Let's just gather the pieces,' you say calmly. Mia's fists unclench a little.",
        miaText: "Scenario: Having someone kneel down with you helps you focus on the toy instead of the kid who broke it. You are still angry, but less out of control.",
        activity: "De-escalation",
        question: "You lowered the temperature of the crisis. Now what?",
        emotions: { sad: 60, anxious: 40, lonely: 20, worried: 50 },
        choices: [
          { text: "Tell her 'It's just a toy, don't cry.'", target: "minimize" },
          { text: "Tell the other kid to apologize right now.", target: "force_apology" },
          { text: "Say 'I know how much you loved this. I'm so sorry.'", target: "validate" }
        ]
      },
      minimize: {
        text: "Scenario: You tell her it's just a toy. She glares at you, snatches the pieces from your hands, and runs away to the bathroom.",
        miaText: "Scenario: They don't understand! It wasn't 'just a toy.' You feel totally misunderstood and angry again.",
        activity: "Invalidation Warning",
        question: "You minimized her feelings.",
        emotions: { sad: 90, anxious: 70, lonely: 100, worried: 60 },
        choices: [
          { text: "Rewind and validate her feelings instead", target: "pick_up" }
        ]
      },
      force_apology: {
        text: "Scenario: You demand the other kid apologize. The kid mumbles a sarcastic 'Sorry.' Mia crosses her arms and scowls. It didn't help.",
        miaText: "Scenario: That was a fake apology! It doesn't fix the airplane. You are still so mad.",
        activity: "Surface Fix",
        question: "Forcing a fake apology rarely repairs emotional damage.",
        emotions: { sad: 80, anxious: 60, lonely: 40, worried: 70 },
        choices: [
          { text: "Rewind and focus on Mia rather than the other kid", target: "pick_up" }
        ]
      },
      validate: {
        text: "Scenario: You say, 'I know how much you loved this.' Mia instantly starts crying. The anger has melted into sadness.",
        miaText: "Scenario: They understand how important the plane was. The anger fades away and you just feel incredibly sad. You start to cry.",
        activity: "Shift from Anger to Grief",
        question: "You successfully moved her from anger to grief. This is progress.",
        emotions: { sad: 90, anxious: 30, lonely: 10, worried: 20 },
        choices: [
          { text: "Let's ask my dad if he has superglue.", target: "success_glue" },
          { text: "Ask if she wants to go sit quietly by the tree.", target: "success_sit" }
        ]
      },
      success_sit: {
        text: "Scenario: You both sit by the tree. You hold the broken wing. She cries for a few minutes, takes a deep breath, and says 'Thanks for sitting with me.'",
        miaText: "Scenario: Crying it out really helped. You accept the toy is broken, but you are so glad you have a friend who cares.",
        activity: "Success!",
        question: "You provided space for her to process a difficult emotion without trying to 'fix' it instantly.",
        emotions: { sad: 20, anxious: 10, lonely: 0, worried: 0 },
        choices: [
          { text: "Complete Lesson", target: "COMPLETE" }
        ]
      },
      success_glue: {
        text: "Scenario: Mia wipes her eyes. 'You think we can fix it?' she asks softly. You nod, and she carefully puts the pieces in her pocket.",
        miaText: "Scenario: Maybe it isn't ruined forever. Having a friend offer to help fix it makes the problem feel so much smaller.",
        activity: "Success!",
        question: "You validated her grief and offered a highly constructive solution.",
        emotions: { sad: 10, anxious: 0, lonely: 0, worried: 0 },
        choices: [
          { text: "Complete Lesson", target: "COMPLETE" }
        ]
      }
    }
  },
  anxiety: {
    id: "anxiety",
    unit: "Unit 1: The Inner World",
    title: "1. Pre-Game Jitters",
    subtitle: "Anxiety & Self-Regulation",
    icon: "Dumbbell", 
    color: "#E8D5C4",
    lessons: [
      {
        title: "The Warning System",
        content: "Anxiety is your body's way of telling you that you care really deeply about what is about to happen. Your stomach hurts because your body is preparing for a challenge.",
        icon: "ShieldCheck"
      },
      {
        title: "The Trap of Avoidance",
        content: "If you run away from what makes you anxious (like skipping the game), your brain learns that the game was actually dangerous! This makes the anxiety worse next time.",
        icon: "RefreshCw"
      },
      {
        title: "Square Breathing",
        content: "To calm your stomach, you can 'trick' the brain into feeling safe by breathing very slowly. Inhale for 4, hold for 4, exhale for 4. You can use the Deep Breathing tool in your coping toolbox!",
        icon: "Wind"
      }
    ],
    nodes: {
      start: {
        text: "Scenario: It's the championship soccer game. Mia is standing on the sidelines staring at the field. She is holding her stomach and breathing very fast.",
        miaText: "Scenario: The field looks huge. Everyone is watching. Your stomach is in knots and you feel like you can't get enough air.",
        activity: "Identify Physical Symptoms",
        question: "Mia is experiencing physical signs of panic. How do you approach?",
        emotions: { sad: 10, anxious: 100, lonely: 40, worried: 90 },
        choices: [
          { text: "Tell her to 'toughen up and get out there!'", target: "toughen_up" },
          { text: "Ask if her stomach hurts because she's sick", target: "distract" },
          { text: "Suggest taking some slow deep breaths together", target: "breathing_exercise" }
        ]
      },
      toughen_up: {
        text: "Scenario: You tell her to toughen up. She looks terrified, shakes her head frantically, and says she wants to go home.",
        miaText: "Scenario: You feel weak and ashamed on top of the panic. You can't do this. You just want to hide in your bed.",
        activity: "Escalation",
        question: "Tough love drastically worsened her panic loop.",
        emotions: { sad: 60, anxious: 100, lonely: 90, worried: 100 },
        choices: [
          { text: "Rewind and try a softer approach", target: "start" }
        ]
      },
      distract: {
        text: "Scenario: You ask if she caught a bug. She nods heavily. 'Yeah, I think I need to go to the nurse.'",
        miaText: "Scenario: Being sick is a great excuse to not play. You agree quickly so you don't have to face the terrifying field.",
        activity: "Avoidance Trap",
        question: "She is using physical symptoms to avoid the scary event.",
        emotions: { sad: 30, anxious: 80, lonely: 40, worried: 80 },
        choices: [
          { text: "Tell her: Okay, go to the nurse.", target: "nurse" },
          { text: "Say 'I think you're just nervous. Let's do a breathing game.'", target: "breathing_exercise" }
        ]
      },
      nurse: {
        text: "Scenario: She waits in the nurse's office for the entire game. She is safe, but feels deeply disappointed in herself.",
        miaText: "Scenario: You avoided the game, but now you feel like you let your team down. You feel extremely disappointed in yourself.",
        activity: "Failed Regulation",
        question: "Avoidance strengthens anxiety in the long term.",
        emotions: { sad: 80, anxious: 50, lonely: 70, worried: 60 },
        choices: [
          { text: "Rewind and help her face her fear", target: "distract" }
        ]
      },
      breathing_exercise: {
        text: "Scenario: You stand next to her and demonstrate 'Square Breathing'. After three cycles, her breathing slows down and color returns to her face.",
        miaText: "Scenario: Doing the breathing game with someone else makes it easier to focus. The tight grip in your chest starts to loosen.",
        activity: "Regulation",
        question: "Her nervous system is returning to baseline.",
        emotions: { sad: 0, anxious: 30, lonely: 10, worried: 40 },
        choices: [
          { text: "Ask: 'Do you want me to run the first play with you?'", target: "success_play" },
          { text: "Tell her: 'See? It's nothing to worry about.'", target: "minimize_anxiety" }
        ]
      },
      minimize_anxiety: {
        text: "Scenario: You tell her it's nothing to worry about. Her eyes widen again. 'What if I miss the goal? Everyone will laugh.' The panic returns.",
        miaText: "Scenario: They say it's nothing to worry about, but your brain is screaming that it IS something to worry about.",
        activity: "Invalidation",
        question: "Don't dismiss the fear. Address it directly.",
        emotions: { sad: 20, anxious: 70, lonely: 40, worried: 70 },
        choices: [
          { text: "Rewind and offer actionable support", target: "breathing_exercise" }
        ]
      },
      success_play: {
        text: "Scenario: You offer to run the first play near her. She nods, ties her cleats tighter. 'Okay... let's go,' she whispers.",
        miaText: "Scenario: Having a buffer person next to you on the field makes it feel much safer. You are ready to try.",
        activity: "Success!",
        question: "You successfully helped Mia regulate her anxiety and face the challenge.",
        emotions: { sad: 0, anxious: 10, lonely: 0, worried: 0 },
        choices: [
        ]
      }
    }
  },
  perf_anxiety: {
    id: "perf_anxiety",
    unit: "Unit 3: School & Learning",
    title: "4. The Math Test",
    subtitle: "Performance Anxiety & Negative Self-Talk",
    icon: "Book",
    color: "#E8D5C4",
    lessons: [
      { title: "Inner Critic", content: "That voice saying 'I'm stupid' is just a thought, not a fact.", icon: "Brain" },
      { title: "Growth Mindset", content: "Mistakes mean your brain is growing.", icon: "Activity" }
    ],
    nodes: {
      start: {
        text: "Scenario: Leo is staring blankly at a blank math test, whispering 'I can't do this.'",
        miaText: "Scenario: The numbers look like alien language. You convince yourself you will fail.",
        activity: "Identify",
        question: "Leo is frozen. What to do?",
        emotions: { sad: 40, anxious: 90, lonely: 50, worried: 100 },
        choices: [
          { text: "Tell him math is easy", target: "minimize" },
          { text: "Help him find one easy problem", target: "break_down" }
        ]
      },
      minimize: { text: "Scenario: He feels dumber. He puts his head down.", miaText: "Scenario: You feel misunderstood.", activity: "Fail", question: "Invalidation never works.", emotions: { sad: 80, anxious: 90, lonely: 80, worried: 90 }, choices: [{ text: "Rewind", target: "start" }] },
      break_down: { text: "Scenario: You find problem #1. He solves it. He smiles.", miaText: "Scenario: One small win builds momentum.", activity: "Success", question: "You broke the freeze cycle.", emotions: { sad: 0, anxious: 0, lonely: 0, worried: 0 }, choices: [{ text: "Complete", target: "COMPLETE" }] }
    }
  },
  bullying: {
    id: "bullying",
    unit: "Unit 4: Friendship Dynamics",
    title: "5. The Lunchroom Whispers",
    subtitle: "Upstander vs. Bystander",
    icon: "Users",
    color: "#D5D0D6",
    lessons: [
      { title: "Bystander Effect", content: "When everyone watches, someone needs to step up.", icon: "Eye" }
    ],
    nodes: {
      start: {
        text: "Scenario: A group is pointing and laughing at a new student.",
        miaText: "Scenario: You are the new kid, everyone is laughing.",
        activity: "Action",
        question: "What do you do?",
        emotions: { sad: 90, anxious: 80, lonely: 100, worried: 90 },
        choices: [
          { text: "Walk past quickly", target: "bystander" },
          { text: "Go sit next to the new student", target: "upstander" }
        ]
      },
      bystander: { text: "Scenario: The kid eats alone.", miaText: "Scenario: Total isolation.", activity: "Fail", question: "Inaction causes harm.", emotions: { sad: 100, anxious: 80, lonely: 100, worried: 80 }, choices: [{ text: "Rewind", target: "start" }] },
      upstander: { text: "Scenario: The laughing stops. The kid smiles at you.", miaText: "Scenario: A lifeline.", activity: "Success", question: "You changed a life.", emotions: { sad: 0, anxious: 0, lonely: 0, worried: 0 }, choices: [{ text: "Complete", target: "COMPLETE" }] }
    }
  },
  disappointment: {
    id: "disappointment",
    unit: "Unit 1: Inside Out",
    title: "6. The Canceled Trip",
    subtitle: "Regulating Huge Letdowns",
    icon: "Moon",
    color: "#B8CAEA",
    lessons: [
      { title: "The Balloon Pop", content: "Excitement turning to disappointment physically hurts.", icon: "Activity" }
    ],
    nodes: {
      start: {
        text: "Scenario: The field trip is canceled.",
        miaText: "Scenario: You packed your bag for weeks. Now nothing.",
        activity: "Identify",
        question: "How do you handle the news?",
        emotions: { sad: 100, anxious: 20, lonely: 30, worried: 20 },
        choices: [
          { text: "Scream 'It's not fair!'", target: "react" },
          { text: "Take a deep breath and cry", target: "feel" }
        ]
      },
      react: { text: "Scenario: You get in trouble for yelling.", miaText: "Scenario: Now you're sad AND grounded.", activity: "Fail", question: "Anger misdirected.", emotions: { sad: 90, anxious: 50, lonely: 50, worried: 50 }, choices: [{ text: "Rewind", target: "start" }] },
      feel: { text: "Scenario: You let the sadness exist without hurting anyone.", miaText: "Scenario: It sucks, but you are okay.", activity: "Success", question: "Processed safely.", emotions: { sad: 20, anxious: 0, lonely: 0, worried: 0 }, choices: [{ text: "Complete", target: "COMPLETE" }] }
    }
  },
  patience: {
    id: "patience",
    unit: "Unit 2: You and Others",
    title: "7. The Long Line",
    subtitle: "Frustration Tolerance",
    icon: "Clock",
    color: "#DFBA55",
    lessons: [
      { title: "Waiting Brain", content: "Waiting feels like forever to a child's brain.", icon: "Brain" }
    ],
    nodes: {
      start: {
        text: "Scenario: Waiting for 30 minutes for a ride.",
        miaText: "Scenario: Your legs hurt and you want it NOW.",
        activity: "Boredom",
        question: "How to wait?",
        emotions: { sad: 10, anxious: 40, lonely: 10, worried: 30 },
        choices: [
          { text: "Complain repeatedly", target: "complain" },
          { text: "Play a finding game", target: "game" }
        ]
      },
      complain: { text: "Scenario: Everyone gets annoyed.", miaText: "Scenario: Mom yells.", activity: "Fail", question: "Made it worse.", emotions: { sad: 50, anxious: 50, lonely: 20, worried: 50 }, choices: [{ text: "Rewind", target: "start" }] },
      game: { text: "Scenario: Time passes quickly.", miaText: "Scenario: That was fun and now it's our turn!", activity: "Success", question: "Distraction works.", emotions: { sad: 0, anxious: 0, lonely: 0, worried: 0 }, choices: [{ text: "Complete", target: "COMPLETE" }] }
    }
  },
  forgiveness: {
    id: "forgiveness",
    unit: "Unit 4: Friendships",
    title: "8. The Stolen Secret",
    subtitle: "Rebuilding Trust",
    icon: "Medal",
    color: "#C8E8D5",
    lessons: [
      { title: "Trust Jars", content: "Trust takes a long time to fill up but a second to spill.", icon: "ShieldCheck" }
    ],
    nodes: {
      start: {
        text: "Scenario: A friend told your secret.",
        miaText: "Scenario: You feel completely betrayed.",
        activity: "Betrayal",
        question: "What now?",
        emotions: { sad: 80, anxious: 50, lonely: 90, worried: 50 },
        choices: [
          { text: "Tell their secret back", target: "revenge" },
          { text: "Tell them they hurt you", target: "communicate" }
        ]
      },
      revenge: { text: "Scenario: You are both enemies.", miaText: "Scenario: Toxic environment.", activity: "Fail", question: "Retaliation solves nothing.", emotions: { sad: 90, anxious: 90, lonely: 90, worried: 90 }, choices: [{ text: "Rewind", target: "start" }] },
      communicate: { text: "Scenario: They apologize deeply. Trust will take time, but the relationship is saved.", miaText: "Scenario: They understand they messed up.", activity: "Success", question: "Healthy conflict resolution.", emotions: { sad: 10, anxious: 10, lonely: 10, worried: 10 }, choices: [{ text: "Complete", target: "COMPLETE" }] }
    }
  }
};
