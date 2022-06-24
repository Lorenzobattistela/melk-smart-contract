//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/AccessControl.sol';
import 'hardhat/console.sol';
import {Base64} from './Base64.sol';

contract MelkTest is ERC721URIStorage, AccessControl {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  mapping(string => address[]) private studentModules;
  mapping(bytes32 => string) private moduleNames;

  mapping(uint256 => bytes32) private tokenIdModules;
  mapping(uint256 => uint256) private tokenIdNumbers;

  string baseSvg = "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif;font-size: 24px;}</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

  string baseSVG = "<?xml version='1.0' encoding='utf-8'?><svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 850.39 850.39' style='enable-background:new 0 0 850.39 850.39;' xml:space='preserve'> <defs> <style> @font-face { font-family: 'Minecraftia-Regular'; src: url(data:application/font-woff2;charset=utf-8;base64,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) format('woff2') } </style> </defs> <style type='text/css'> .st0{stroke:#FFFFFF;stroke-miterlimit:10;} .st1{fill:#A0E546;} .st2{font-family:'Minecraftia-Regular';} .st3{font-size:20px;} .st4{fill:#FFFFFF;} .st5{fill:#2ECE29;} .st6{fill:#775CE1;} .st7{fill:#EDB015;} .st8{letter-spacing:22;} .st9{fill:#FFFFFF;stroke:#FFFFFF;stroke-miterlimit:10;} .st10{fill:#4C98E2;} .st11{fill:none;} .st12{font-size:55px;} .st13{display:none;} .st14{font-size:60px;} .st15{fill:#CE3028;} .st16{fill:#EAB52F;} .st17{display:none;fill:#720909;} .st18{font-size:39.2318px;} .st19{font-size:43.1707px;} </style> <g id='linhacodigo'> <path class='st0' d='M849.55,850.39H0.84c-0.46,0-0.84-0.38-0.84-0.84V0.84C0,0.38,0.38,0,0.84,0h848.71 c0.46,0,0.84,0.38,0.84,0.84v848.71C850.39,850.02,850.02,850.39,849.55,850.39z'/><text transform='matrix(1 0 0 1 49.0367 325.8286)'><tspan x='0' y='0' class='st1 st2 st3'>pragma  solidity</tspan><tspan x='199.5' y='0' class='st4 st2 st3'>  0.8.1 ;</tspan><tspan x='0' y='90' class='st1 st2 st3'>contract</tspan><tspan x='120' y='90' class='st4 st2 st3'>web3dev  {</tspan><tspan x='32.92' y='135' class='st4 st2 st3'>function  </tspan><tspan x='145.42' y='135' class='st10 st2 st3'>bootcamp</tspan><tspan x='265.42' y='135' class='st4 st2 st3'>() </tspan><tspan x='300.42' y='135' class='st1 st2 st3'>public view returns</tspan><tspan x='547' y='135' class='st4 st2 st3'>(</tspan><tspan x='570.42' y='135' class='st10 st2 st3'>string memory)</tspan><tspan x='755.42' y='135' class='st4 st2 st3'>{</tspan><tspan x='111.67' y='180' class='st4 st2 st3'>return </tspan><tspan x='216.67' y='180' class='st6 st2 st3'>";

  string svgPart2 = ";</tspan><tspan x='32.92' y='225' class='st4 st2 st3'>}</tspan><tspan x='0' y='270' class='st4 st2 st3'>}</tspan></text></g><g><text transform='matrix(1 0 0 1 650.213 781.2156)' class='st4 st2 st12'>#";

  string svgPart3 = "</text></g><g><rect x='48.13' y='192.85' class='st11' width='497.66' height='96.99'/> <text transform='matrix(1 0 0 1 48.1271 282.8495)' class='st4 st2 st14'>";

  string svgPart4 = "</text><rect x='38.13' y='32.02' class='st15' width='55.77' height='48.46'/><rect x='119.2' y='32.02' class='st16' width='55.77' height='48.46'/><rect x='201.18' y='32.02' class='st5' width='55.77' height='48.46'/><text transform='matrix(1.2764 0 0 1 138.4717 101.3228)' class='st13 st2 st18'>-</text><text transform='matrix(1.1781 0 0 1 227.6772 105.4309)' class='st13 st2 st19'>+</text></g></svg>";

  event StudentFinishedModule(
    address indexed studentAddress,
    string indexed moduleName
  );

  event CourseAdded(string indexed moduleName);
  constructor() ERC721 ('Projeto MELK', 'MELK') {
    _setupRole(DEFAULT_ADMIN_ROLE,0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);
  }

  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

  function addModule(string memory newModule) external {
    bytes32 module = keccak256(abi.encodePacked(newModule));
    require(
      bytes(moduleNames[module]).length == 0, 'Module already exists'
    );
    moduleNames[module] = newModule;
    emit CourseAdded(newModule);
  }

  function mintCertificate(
        string memory course,
        address studentAddress,
        string memory discordUser,
        string memory wallet
    ) external onlyMinter {
        studentModules[course].push(studentAddress);
        bytes32 encodedCourse = keccak256(abi.encodePacked(course));
        require(
            bytes(moduleNames[encodedCourse]).length != 0,
            'Invalid Module'
        );
        _mintCertificate(encodedCourse, discordUser, studentAddress, wallet);
        emit StudentFinishedModule(studentAddress, course);
    }

    function _mintCertificate(
        bytes32 encodedCourse,
        string memory discordUser,
        address studentAddress,
        string memory wallet
    ) internal {
        _tokenIds.increment();
        uint256 newTokenID = _tokenIds.current();
        tokenIdModules[newTokenID] = encodedCourse; // says that the token X is for module Y
        _safeMint(studentAddress, newTokenID);
        _setTokenURI(newTokenID, discordUser, wallet);
    }

      function _setTokenURI(uint256 tokenId, string memory username, string memory wallet)
          public
          view
          virtual
          returns (string memory)
      {
          string memory course = moduleNames[tokenIdModules[tokenId]];

          string memory finalSvg = string(
              abi.encodePacked(
                  baseSVG,
                  course,
                  svgPart2,
                  Strings.toString(tokenId),
                  svgPart3,
                  username,
                  svgPart4
              )
          ); 

          string memory metadata = string(
              abi.encodePacked(
                  '{"name": "Melk - Learn To Earn", ',
                  '"attributes": [ { "trait_type": "course", "value": "',
                  course,
                  '"},{"trait_type": "discord username", "value": "',
                  username,
                  '"}, {"trait_type": "number", "value": "',
                  Strings.toString(tokenId),
                  '"}, {"trait_type": "wallet", "value": "', wallet,'"}],  "image": "data:image/svg+xml;base64,',
                   Base64.encode(bytes(finalSvg)),
                   '"}'
               )
           );
           string memory json = Base64.encode(bytes(metadata));
           console.log(string(abi.encodePacked('data:application/json;base64,', json)));

           return string(abi.encodePacked('data:application/json;base64,', json));
       }

    modifier onlyAdmin() {
      console.log(msg.sender);
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            'Caller is not an Window Admin (admin)'
        );
        _;
    }

    modifier onlyMinter() {
        console.log(msg.sender);
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            'Caller is not an Window Admin (minter)'
        );
        _;
    }

}























