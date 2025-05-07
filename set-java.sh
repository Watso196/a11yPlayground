#!/bin/bash

# Try to find Java 17
JAVA_17_HOME=$(/usr/libexec/java_home -v17 2>/dev/null)

if [ -z "$JAVA_17_HOME" ]; then
  echo "⚠️  Java 17 not found. Please install it via Homebrew:"
  echo "   brew install openjdk@17"
  echo "You can verify installed versions with:"
  echo "   /usr/libexec/java_home -V"
  return 1
else
  # Set Java 17 as the default for the entire project
  export JAVA_HOME=$JAVA_17_HOME
  export PATH="$JAVA_HOME/bin:$PATH"
  echo "✅ JAVA_HOME set to Java 17: $JAVA_HOME"
fi

