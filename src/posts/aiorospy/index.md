---
title: Aiorospy
description: An Asyncio wrapper for Rospy
date: 2019-04-01
tags:
- programming
- robotics
---

An `asyncio` wrapper for `rospy`.  This allows us to use the async concurrency model with Rospy instead of threading.

This doesn't fix any of the fundamental problems with Rospy as it still uses threads behind the scenes. But your userspace code will be much cleaner!

This work was co-developed by and is now maintained by a colleague.

<https://github.com/locusrobotics/aiorospy>
