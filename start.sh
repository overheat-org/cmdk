#!/bin/bash

ulimit -m 10240
exec bun run src/api/interpreter/Parser.ts
