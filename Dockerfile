FROM node:16.7.0

# Setup HardHat
WORKDIR /home/ubuntu/build
RUN mkdir /home/ubuntu/build/contracts

COPY hardhat.config.js /home/ubuntu/build/hardhat.config.ts
COPY package.json /home/ubuntu/build/package.json
RUN yarn install

# Gnosis Safe
WORKDIR /home/ubuntu/
RUN git clone https://github.com/gnosis/safe-contracts.git
WORKDIR /home/ubuntu/safe-contracts
RUN git checkout v1.3.0
RUN cp -r /home/ubuntu/safe-contracts/* /home/ubuntu/build/contracts
RUN rm -r /home/ubuntu/safe-contracts

# Uniswap
WORKDIR /home/ubuntu/
RUN git clone https://github.com/Uniswap/uniswap-interface.git

# Compile contracts
WORKDIR /home/ubuntu/build
RUN npx hardhat compile

# Deploy contracts
# RUN npx hardhat run scripts/sample-script.js

# Run as standalone node
# RUN npx hardhat node