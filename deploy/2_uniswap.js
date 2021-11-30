module.exports = async (hre) => {
  // Get the signers (default, pre-funded accounts)
  const accounts = await hre.ethers.getSigners();

  // var json = require('../artifacts/third_party/v2-core/contracts/UniswapV2Pair.sol/UniswapV2Pair.json')
  // actual_bytecode = json["bytecode"]
  // const bytecode = "0x60806040526001600c5534801561001557600080fd5b50604051469080605261246b8239604080519182900360520182208282018252600a8352692ab734b9bbb0b8102b1960b11b6020938401528151808301835260018152603160f81b908401528151808401919091527fbfcc8ef98ffbf7b6c3fec7bf5185b566b9863e35a9d83acd49ad6824b5969738818301527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6606082015260808101949094523060a0808601919091528151808603909101815260c09094019052825192019190912060035550600580546001600160a01b03191633179055612366806101056000396000f3fe608060405234801561001057600080fd5b50600436106101b95760003560e01c80636a627842116100f9578063ba9a7a5611610097578063d21220a711610071578063d21220a714610544578063d505accf1461054c578063dd62ed3e1461059d578063fff6cae9146105cb576101b9565b8063ba9a7a561461050e578063bc25cf7714610516578063c45a01551461053c576101b9565b80637ecebe00116100d35780637ecebe001461047557806389afcb441461049b57806395d89b41146104da578063a9059cbb146104e2576101b9565b80636a6278421461042157806370a08231146104475780637464fc3d1461046d576101b9565b806323b872dd116101665780633644e515116101405780633644e515146103db578063485cc955146103e35780635909c0d5146104115780635a3d549314610419576101b9565b806323b872dd1461037f57806330adf81f146103b5578063313ce567146103bd576101b9565b8063095ea7b311610197578063095ea7b3146103015780630dfe16811461034157806318160ddd14610365576101b9565b8063022c0d9f146101be57806306fdde031461024c5780630902f1ac146102c9575b600080fd5b61024a600480360360808110156101d457600080fd5b8135916020810135916001600160a01b03604083013516919081019060808101606082013564010000000081111561020b57600080fd5b82018360208201111561021d57600080fd5b8035906020019184600183028401116401000000008311171561023f57600080fd5b5090925090506105d3565b005b610254610b27565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561028e578181015183820152602001610276565b50505050905090810190601f1680156102bb5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102d1610b60565b604080516001600160701b03948516815292909316602083015263ffffffff168183015290519081900360600190f35b61032d6004803603604081101561031757600080fd5b506001600160a01b038135169060200135610b8a565b604080519115158252519081900360200190f35b610349610ba1565b604080516001600160a01b039092168252519081900360200190f35b61036d610bb0565b60408051918252519081900360200190f35b61032d6004803603606081101561039557600080fd5b506001600160a01b03813581169160208101359091169060400135610bb6565b61036d610c50565b6103c5610c74565b6040805160ff9092168252519081900360200190f35b61036d610c79565b61024a600480360360408110156103f957600080fd5b506001600160a01b0381358116916020013516610c7f565b61036d610d24565b61036d610d2a565b61036d6004803603602081101561043757600080fd5b50356001600160a01b0316610d30565b61036d6004803603602081101561045d57600080fd5b50356001600160a01b0316611030565b61036d611042565b61036d6004803603602081101561048b57600080fd5b50356001600160a01b0316611048565b6104c1600480360360208110156104b157600080fd5b50356001600160a01b031661105a565b6040805192835260208301919091528051918290030190f35b610254611400565b61032d600480360360408110156104f857600080fd5b506001600160a01b038135169060200135611439565b61036d611446565b61024a6004803603602081101561052c57600080fd5b50356001600160a01b031661144c565b6103496115b7565b6103496115c6565b61024a600480360360e081101561056257600080fd5b506001600160a01b03813581169160208101359091169060408101359060608101359060ff6080820135169060a08101359060c001356115d5565b61036d600480360360408110156105b357600080fd5b506001600160a01b03813581169160200135166117fd565b61024a61181a565b600c5460011461061e576040805162461bcd60e51b8152602060048201526011602482015270155b9a5cddd85c158c8e881313d0d2d151607a1b604482015290519081900360640190fd5b6000600c55841515806106315750600084115b61066c5760405162461bcd60e51b81526004018080602001828103825260258152602001806122786025913960400191505060405180910390fd5b600080610677610b60565b5091509150816001600160701b03168710801561069c5750806001600160701b031686105b6106d75760405162461bcd60e51b81526004018080602001828103825260218152602001806122c16021913960400191505060405180910390fd5b60065460075460009182916001600160a01b039182169190811690891682148015906107155750806001600160a01b0316896001600160a01b031614155b610766576040805162461bcd60e51b815260206004820152601560248201527f556e697377617056323a20494e56414c49445f544f0000000000000000000000604482015290519081900360640190fd5b8a1561077757610777828a8d61197c565b891561078857610788818a8c61197c565b861561084357886001600160a01b03166310d1e85c338d8d8c8c6040518663ffffffff1660e01b815260040180866001600160a01b03166001600160a01b03168152602001858152602001848152602001806020018281038252848482818152602001925080828437600081840152601f19601f8201169050808301925050509650505050505050600060405180830381600087803b15801561082a57600080fd5b505af115801561083e573d6000803e3d6000fd5b505050505b604080516370a0823160e01b815230600482015290516001600160a01b038416916370a08231916024808301926020929190829003018186803b15801561088957600080fd5b505afa15801561089d573d6000803e3d6000fd5b505050506040513d60208110156108b357600080fd5b5051604080516370a0823160e01b815230600482015290519195506001600160a01b038316916370a0823191602480820192602092909190829003018186803b1580156108ff57600080fd5b505afa158015610913573d6000803e3d6000fd5b505050506040513d602081101561092957600080fd5b5051925060009150506001600160701b0385168a9003831161094c57600061095b565b89856001600160701b03160383035b9050600089856001600160701b0316038311610978576000610987565b89856001600160701b03160383035b905060008211806109985750600081115b6109d35760405162461bcd60e51b815260040180806020018281038252602481526020018061229d6024913960400191505060405180910390fd5b6000610a076109e984600363ffffffff611b2f16565b6109fb876103e863ffffffff611b2f16565b9063ffffffff611b9b16565b90506000610a1f6109e984600363ffffffff611b2f16565b9050610a50620f4240610a446001600160701b038b8116908b1663ffffffff611b2f16565b9063ffffffff611b2f16565b610a60838363ffffffff611b2f16565b1015610ab3576040805162461bcd60e51b815260206004820152600c60248201527f556e697377617056323a204b0000000000000000000000000000000000000000604482015290519081900360640190fd5b5050610ac184848888611bf3565b60408051838152602081018390528082018d9052606081018c905290516001600160a01b038b169133917fd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d8229181900360800190a350506001600c55505050505050505050565b6040518060400160405280600a81526020017f556e69737761702056320000000000000000000000000000000000000000000081525081565b6008546001600160701b0380821692600160701b830490911691600160e01b900463ffffffff1690565b6000610b97338484611dd0565b5060015b92915050565b6006546001600160a01b031681565b60005481565b6001600160a01b038316600090815260026020908152604080832033845290915281205460001914610c3b576001600160a01b0384166000908152600260209081526040808320338452909152902054610c16908363ffffffff611b9b16565b6001600160a01b03851660009081526002602090815260408083203384529091529020555b610c46848484611e32565b5060019392505050565b7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b601281565b60035481565b6005546001600160a01b03163314610cde576040805162461bcd60e51b815260206004820152601460248201527f556e697377617056323a20464f5242494444454e000000000000000000000000604482015290519081900360640190fd5b600680546001600160a01b039384167fffffffffffffffffffffffff00000000000000000000000000000000000000009182161790915560078054929093169116179055565b60095481565b600a5481565b6000600c54600114610d7d576040805162461bcd60e51b8152602060048201526011602482015270155b9a5cddd85c158c8e881313d0d2d151607a1b604482015290519081900360640190fd5b6000600c81905580610d8d610b60565b50600654604080516370a0823160e01b815230600482015290519395509193506000926001600160a01b03909116916370a08231916024808301926020929190829003018186803b158015610de157600080fd5b505afa158015610df5573d6000803e3d6000fd5b505050506040513d6020811015610e0b57600080fd5b5051600754604080516370a0823160e01b815230600482015290519293506000926001600160a01b03909216916370a0823191602480820192602092909190829003018186803b158015610e5e57600080fd5b505afa158015610e72573d6000803e3d6000fd5b505050506040513d6020811015610e8857600080fd5b505190506000610ea7836001600160701b03871663ffffffff611b9b16565b90506000610ec4836001600160701b03871663ffffffff611b9b16565b90506000610ed28787611eec565b60005490915080610f0f57610efb6103e86109fb610ef6878763ffffffff611b2f16565b61204a565b9850610f0a60006103e861209c565b610f5e565b610f5b6001600160701b038916610f2c868463ffffffff611b2f16565b81610f3357fe5b046001600160701b038916610f4e868563ffffffff611b2f16565b81610f5557fe5b04612132565b98505b60008911610f9d5760405162461bcd60e51b815260040180806020018281038252602881526020018061230a6028913960400191505060405180910390fd5b610fa78a8a61209c565b610fb386868a8a611bf3565b8115610fe357600854610fdf906001600160701b0380821691600160701b90041663ffffffff611b2f16565b600b555b6040805185815260208101859052815133927f4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f928290030190a250506001600c5550949695505050505050565b60016020526000908152604090205481565b600b5481565b60046020526000908152604090205481565b600080600c546001146110a8576040805162461bcd60e51b8152602060048201526011602482015270155b9a5cddd85c158c8e881313d0d2d151607a1b604482015290519081900360640190fd5b6000600c819055806110b8610b60565b50600654600754604080516370a0823160e01b815230600482015290519496509294506001600160a01b039182169391169160009184916370a08231916024808301926020929190829003018186803b15801561111457600080fd5b505afa158015611128573d6000803e3d6000fd5b505050506040513d602081101561113e57600080fd5b5051604080516370a0823160e01b815230600482015290519192506000916001600160a01b038516916370a08231916024808301926020929190829003018186803b15801561118c57600080fd5b505afa1580156111a0573d6000803e3d6000fd5b505050506040513d60208110156111b657600080fd5b5051306000908152600160205260408120549192506111d58888611eec565b600054909150806111ec848763ffffffff611b2f16565b816111f357fe5b049a5080611207848663ffffffff611b2f16565b8161120e57fe5b04995060008b118015611221575060008a115b61125c5760405162461bcd60e51b81526004018080602001828103825260288152602001806122e26028913960400191505060405180910390fd5b611266308461214a565b611271878d8d61197c565b61127c868d8c61197c565b604080516370a0823160e01b815230600482015290516001600160a01b038916916370a08231916024808301926020929190829003018186803b1580156112c257600080fd5b505afa1580156112d6573d6000803e3d6000fd5b505050506040513d60208110156112ec57600080fd5b5051604080516370a0823160e01b815230600482015290519196506001600160a01b038816916370a0823191602480820192602092909190829003018186803b15801561133857600080fd5b505afa15801561134c573d6000803e3d6000fd5b505050506040513d602081101561136257600080fd5b5051935061137285858b8b611bf3565b81156113a25760085461139e906001600160701b0380821691600160701b90041663ffffffff611b2f16565b600b555b604080518c8152602081018c905281516001600160a01b038f169233927fdccd412f0b1252819cb1fd330b93224ca42612892bb3f4f789976e6d81936496929081900390910190a35050505050505050506001600c81905550915091565b6040518060400160405280600681526020017f554e492d5632000000000000000000000000000000000000000000000000000081525081565b6000610b97338484611e32565b6103e881565b600c54600114611497576040805162461bcd60e51b8152602060048201526011602482015270155b9a5cddd85c158c8e881313d0d2d151607a1b604482015290519081900360640190fd5b6000600c55600654600754600854604080516370a0823160e01b815230600482015290516001600160a01b0394851694909316926115469285928792611541926001600160701b03169185916370a0823191602480820192602092909190829003018186803b15801561150957600080fd5b505afa15801561151d573d6000803e3d6000fd5b505050506040513d602081101561153357600080fd5b50519063ffffffff611b9b16565b61197c565b600854604080516370a0823160e01b815230600482015290516115ad928492879261154192600160701b90046001600160701b0316916001600160a01b038616916370a0823191602480820192602092909190829003018186803b15801561150957600080fd5b50506001600c5550565b6005546001600160a01b031681565b6007546001600160a01b031681565b4284101561162a576040805162461bcd60e51b815260206004820152601260248201527f556e697377617056323a20455850495245440000000000000000000000000000604482015290519081900360640190fd5b6003546001600160a01b0380891660008181526004602090815260408083208054600180820190925582517f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98186015280840196909652958d166060860152608085018c905260a085019590955260c08085018b90528151808603909101815260e0850182528051908301207f19010000000000000000000000000000000000000000000000000000000000006101008601526101028501969096526101228085019690965280518085039096018652610142840180825286519683019690962095839052610162840180825286905260ff89166101828501526101a284018890526101c28401879052519193926101e280820193601f1981019281900390910190855afa158015611760573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116158015906117965750886001600160a01b0316816001600160a01b0316145b6117e7576040805162461bcd60e51b815260206004820152601c60248201527f556e697377617056323a20494e56414c49445f5349474e415455524500000000604482015290519081900360640190fd5b6117f2898989611dd0565b505050505050505050565b600260209081526000928352604080842090915290825290205481565b600c54600114611865576040805162461bcd60e51b8152602060048201526011602482015270155b9a5cddd85c158c8e881313d0d2d151607a1b604482015290519081900360640190fd5b6000600c55600654604080516370a0823160e01b81523060048201529051611975926001600160a01b0316916370a08231916024808301926020929190829003018186803b1580156118b657600080fd5b505afa1580156118ca573d6000803e3d6000fd5b505050506040513d60208110156118e057600080fd5b5051600754604080516370a0823160e01b815230600482015290516001600160a01b03909216916370a0823191602480820192602092909190829003018186803b15801561192d57600080fd5b505afa158015611941573d6000803e3d6000fd5b505050506040513d602081101561195757600080fd5b50516008546001600160701b0380821691600160701b900416611bf3565b6001600c55565b604080518082018252601981527f7472616e7366657228616464726573732c75696e74323536290000000000000060209182015281516001600160a01b0385811660248301526044808301869052845180840390910181526064909201845291810180516001600160e01b03167fa9059cbb000000000000000000000000000000000000000000000000000000001781529251815160009460609489169392918291908083835b60208310611a425780518252601f199092019160209182019101611a23565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114611aa4576040519150601f19603f3d011682016040523d82523d6000602084013e611aa9565b606091505b5091509150818015611ad7575080511580611ad75750808060200190516020811015611ad457600080fd5b50515b611b28576040805162461bcd60e51b815260206004820152601a60248201527f556e697377617056323a205452414e534645525f4641494c4544000000000000604482015290519081900360640190fd5b5050505050565b6000811580611b4a57505080820282828281611b4757fe5b04145b610b9b576040805162461bcd60e51b815260206004820152601460248201527f64732d6d6174682d6d756c2d6f766572666c6f77000000000000000000000000604482015290519081900360640190fd5b80820382811115610b9b576040805162461bcd60e51b815260206004820152601560248201527f64732d6d6174682d7375622d756e646572666c6f770000000000000000000000604482015290519081900360640190fd5b6001600160701b038411801590611c1157506001600160701b038311155b611c62576040805162461bcd60e51b815260206004820152601360248201527f556e697377617056323a204f564552464c4f5700000000000000000000000000604482015290519081900360640190fd5b60085463ffffffff42811691600160e01b90048116820390811615801590611c9257506001600160701b03841615155b8015611ca657506001600160701b03831615155b15611d17578063ffffffff16611cd485611cbf866121e8565b6001600160e01b03169063ffffffff6121fa16565b600980546001600160e01b03929092169290920201905563ffffffff8116611cff84611cbf876121e8565b600a80546001600160e01b0392909216929092020190555b600880546dffffffffffffffffffffffffffff19166001600160701b03888116919091177fffffffff0000000000000000000000000000ffffffffffffffffffffffffffff16600160701b8883168102919091176001600160e01b0316600160e01b63ffffffff871602179283905560408051848416815291909304909116602082015281517f1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1929181900390910190a1505050505050565b6001600160a01b03808416600081815260026020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b6001600160a01b038316600090815260016020526040902054611e5b908263ffffffff611b9b16565b6001600160a01b038085166000908152600160205260408082209390935590841681522054611e90908263ffffffff61221f16565b6001600160a01b0380841660008181526001602090815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b600080600560009054906101000a90046001600160a01b03166001600160a01b031663017e7e586040518163ffffffff1660e01b815260040160206040518083038186803b158015611f3d57600080fd5b505afa158015611f51573d6000803e3d6000fd5b505050506040513d6020811015611f6757600080fd5b5051600b546001600160a01b038216158015945091925090612036578015612031576000611faa610ef66001600160701b0388811690881663ffffffff611b2f16565b90506000611fb78361204a565b90508082111561202e576000611fe5611fd6848463ffffffff611b9b16565b6000549063ffffffff611b2f16565b9050600061200a83611ffe86600563ffffffff611b2f16565b9063ffffffff61221f16565b9050600081838161201757fe5b049050801561202a5761202a878261209c565b5050505b50505b612042565b8015612042576000600b555b505092915050565b6000600382111561208d575080600160028204015b818110156120875780915060028182858161207657fe5b04018161207f57fe5b04905061205f565b50612097565b8115612097575060015b919050565b6000546120af908263ffffffff61221f16565b60009081556001600160a01b0383168152600160205260409020546120da908263ffffffff61221f16565b6001600160a01b03831660008181526001602090815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b60008183106121415781612143565b825b9392505050565b6001600160a01b038216600090815260016020526040902054612173908263ffffffff611b9b16565b6001600160a01b038316600090815260016020526040812091909155546121a0908263ffffffff611b9b16565b60009081556040805183815290516001600160a01b038516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef919081900360200190a35050565b6001600160701b0316600160701b0290565b60006001600160701b0382166001600160e01b0384168161221757fe5b049392505050565b80820182811015610b9b576040805162461bcd60e51b815260206004820152601460248201527f64732d6d6174682d6164642d6f766572666c6f77000000000000000000000000604482015290519081900360640190fdfe556e697377617056323a20494e53554646494349454e545f4f55545055545f414d4f554e54556e697377617056323a20494e53554646494349454e545f494e5055545f414d4f554e54556e697377617056323a20494e53554646494349454e545f4c4951554944495459556e697377617056323a20494e53554646494349454e545f4c49515549444954595f4255524e4544556e697377617056323a20494e53554646494349454e545f4c49515549444954595f4d494e544544a265627a7a723158201de350a60e235ba39910d4b81c2fe1d4514d10b0d8397eec1f295b106026d09d64736f6c63430005100032454950373132446f6d61696e28737472696e67206e616d652c737472696e672076657273696f6e2c75696e7432353620636861696e49642c6164647265737320766572696679696e67436f6e747261637429";
  // if (bytecode != actual_bytecode) {
  //   console.log("expected & actual:", bytecode, actual_bytecode)
  //   throw new Error("not matching bytecode")
  // };

  // const COMPUTED_INIT_CODE_HASH = hre.ethers.utils.keccak256(bytecode)
  // console.log("init hash:", COMPUTED_INIT_CODE_HASH)
  // // 0xab4f7a0b05a05bbf79ea6b22591c6fa5b03ade3988ee445391cbb95a33e4bc2b

  // Deploy Uniswap factory
  feeToSetter_address = accounts[2].address;
  const Factory = await hre.ethers.getContractFactory("UniswapV2Factory");
  const factory = await Factory.deploy(feeToSetter_address);
  await factory.deployed();
  console.log("Uniswap factory deployed to:", factory.address);

  // Deploy Router02
  weth_address = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
  const Router = await hre.ethers.getContractFactory("UniswapV2Router02");
  const router = await Router.deploy(factory.address, weth_address);
  await router.deployed();
  console.log("Router02 deployed to:", router.address);
};