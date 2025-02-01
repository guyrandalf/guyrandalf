"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { techStack } from "@/lib/stack";

export default function AboutSection() {
  return (
    <div className="space-y-12 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-4xl font-bold">More About Me</h1>
        <p className="text-xl text-muted-foreground">Full Stack Engineer</p>
      </motion.div>

      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose dark:prose-invert"
        >
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            Hi, I'm Osabuohien Randalf Ehigiator, a Full Stack Engineer, tech
            enthusiast, and part-time philosopher (by that, I mean I think way
            too much about everything). I spend my days building web and mobile
            apps at Atulocare, helping people solve real problems with
            technology. And by people, I mean anyone who enjoys smooth,
            intuitive digital experiences (you're welcome).
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            I'm also the founder of Randisoft, an AI-powered SaaS platform
            designed to make businesses smarter, workflows smoother, and
            decision-making less… regrettable. My goal is to automate the boring
            stuff so humans can focus on what really matters—like debating
            whether AI will take over the world or just make better coffee
            recommendations.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            Now, let's get one thing straight: I play both the piano and the
            organ, but let's be honest—the organ is objectively superior. More
            keys, more power, and it can shake the walls of a cathedral. The
            piano? Cute. The organ? A divine masterpiece. I don't make the
            rules.
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            When I'm not coding or proving why the organ reigns supreme, I like
            to think about ways technology can save lives, especially in
            healthcare. Whether it's AI-driven medical solutions or innovative
            health tech, I believe technology should do more than just make life
            convenient—it should make it longer.
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            If you ever need an app, a discussion on AI's future, or a (very)
            passionate debate on musical instruments, I'm your guy. 😎
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold">Skills & Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {techStack.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
