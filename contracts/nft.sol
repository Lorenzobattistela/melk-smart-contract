//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/AccessControl.sol';
import 'hardhat/console.sol';

contract MelkTest is ERC721URIStorage, AccessControl {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  mapping(string => address[]) private studentModules;
  mapping(bytes32 => string) private moduleNames;

  mapping(uint256 => bytes32) private tokenIdModules;
  mapping(uint256 => uint256) private tokenIdNumbers;

  event StudentFinishedModule(
    address indexed studentAddress,
    string indexed moduleName
  );

  event CourseAdded(string indexed moduleName);
  constructor() ERC721 ('Projeto MELK', 'MELK') {
    _setupRole(DEFAULT_ADMIN_ROLE, 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199);
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
        string memory tokenUri
    ) external onlyMinter {
        studentModules[course].push(studentAddress);
        bytes32 encodedCourse = keccak256(abi.encodePacked(course));
        require(
            bytes(moduleNames[encodedCourse]).length != 0,
            'Invalid Module'
        );
        _mintCertificate(encodedCourse, tokenUri, studentAddress);
        emit StudentFinishedModule(studentAddress, course);
    }

    function _mintCertificate(
        bytes32 encodedCourse,
        string memory tokenUri,
        address studentAddress
    ) internal {
        _tokenIds.increment();
        uint256 newTokenID = _tokenIds.current();
        tokenIdModules[newTokenID] = encodedCourse; // says that the token X is for module Y
        _safeMint(studentAddress, newTokenID);
        _setTokenURI(newTokenID, tokenUri);
    }

    // function _setTokenURI(uint256 tokenId, string memory username, address walletAddress, string memory magicNumber, string memory wallet)
    //     public
    //     view
    //     virtual
    //     returns (string memory)
    // {
    //     string memory course = moduleNames[tokenIdModules[tokenId]];
    //     string memory finalSvg = string(
    //         abi.encodePacked(
    //             baseSVG,
    //             course,
    //             svgPart2,
    //             Strings.toString(tokenId),
    //             svgPart3,
    //             username,
    //             svgPart4
    //         )
    //     ); 
    //     walletAddress;
    //     string memory metadata = string(
    //         abi.encodePacked(
    //             '{"name": "Melk - Learn To Earn", ',
    //             '"attributes": [ { "trait_type": "course", "value": "',
    //             course,
    //             '"},{"trait_type": "discord username", "value": "',
    //             username,
    //             '"}, {"trait_type": "magic number", "value": "', magicNumber,'"}, {"trait_type": "number", "value": "',
    //             Strings.toString(tokenId),
    //             '"}, {"trait_type": "wallet", "value": "', wallet,'"}],  "image": "data:image/svg+xml;base64,',
    //             Base64.encode(bytes(finalSvg)),
    //             '"}'
    //         )
    //     );
    //     string memory json = Base64.encode(bytes(metadata));
    //     return string(abi.encodePacked('data:application/json;base64,', json));
    // }

    modifier onlyAdmin() {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            'Caller is not an Window Admin (admin)'
        );
        _;
    }

    modifier onlyMinter() {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            'Caller is not an Window Admin (minter)'
        );
        _;
    }

}























